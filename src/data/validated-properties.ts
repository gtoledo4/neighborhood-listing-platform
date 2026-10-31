import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv/dist/2020.js";
import type { PropertyContract } from "../types";

const schemaPath = path.join(
  process.cwd(),
  "src/schemas/property.schema.json"
);

const dataPath = path.join(
  process.cwd(),
  "data/generated/properties-regenerated.json"
);

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

if (!validate(data[0])) {
  throw new Error("Property data failed schema validation.");
}

for (const property of data) {
  if (!validate(property)) {
    throw new Error("Property data failed schema validation.");
  }
}

export const validatedProperties =
  data as PropertyContract[];