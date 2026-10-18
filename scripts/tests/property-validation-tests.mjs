import fs from "node:fs";
import Ajv from "ajv/dist/2020.js";

const schema = JSON.parse(
  fs.readFileSync("src/schemas/property.schema.json", "utf8")
);

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

const validProperty = {
  property_id: "PROP-TEST-001",
  address: "123 Test Street",
  city: "Sacramento",
  state: "CA",
  zip_code: "95825",
  price: 500000,
  bedrooms: 3,
  bathrooms: 2,
  square_feet: 1800,
  amenities: ["Garage", "Patio"],
  local_sponsors: [
    {
      sponsor_id: "SPON-TEST-001",
      name: "Test Mortgage",
      category: "mortgage",
    },
  ],
};

const tests = [
  {
    name: "valid property",
    data: validProperty,
    shouldBeValid: true,
  },
  {
    name: "missing property_id",
    data: (() => {
      const property = { ...validProperty };
      delete property.property_id;
      return property;
    })(),
    shouldBeValid: false,
  },
  {
    name: "negative price",
    data: {
      ...validProperty,
      price: -50000,
    },
    shouldBeValid: false,
  },
  {
    name: "bad ZIP code",
    data: {
      ...validProperty,
      zip_code: "9582",
    },
    shouldBeValid: false,
  },
  {
    name: "unknown property field",
    data: {
      ...validProperty,
      swimming_pool_size: 40,
    },
    shouldBeValid: false,
  },
];

let passed = 0;

for (const test of tests) {
  const valid = validate(test.data);

  if (valid === test.shouldBeValid) {
    console.log(`✅ ${test.name}`);
    passed++;
  } else {
    console.log(`❌ ${test.name}`);
    console.log(validate.errors);
  }
}

console.log(`\n${passed}/${tests.length} tests passed.`);

if (passed !== tests.length) {
  process.exit(1);
}