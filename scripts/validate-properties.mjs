import fs from "node:fs";
import Ajv from "ajv/dist/2020.js";

const schema = JSON.parse(
  fs.readFileSync("src/schemas/property.schema.json", "utf8")
);

const dataFile = process.argv[2] ?? "data/generated/properties-raw.json";

const data = JSON.parse(
  fs.readFileSync(dataFile, "utf8")
);

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

let hasErrors = false;

data.forEach((property, index) => {
  const valid = validate(property);

  if (!valid) {
    hasErrors = true;

    console.log(`\nProperty ${index + 1}: ${property.property_id}`);
    console.log("Validation errors:");

    for (const error of validate.errors ?? []) {
      console.log(
        `- ${error.instancePath || "(root)"} ${error.message}`
      );
    }
  }
});

if (hasErrors) {
  console.log("\n❌ Validation failed.");
  process.exit(1);
}

console.log("✅ All properties are valid.");