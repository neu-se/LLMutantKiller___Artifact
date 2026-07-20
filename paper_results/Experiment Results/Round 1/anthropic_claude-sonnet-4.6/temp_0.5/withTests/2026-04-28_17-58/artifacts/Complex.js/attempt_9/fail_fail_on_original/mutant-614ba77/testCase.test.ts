const path = require("path");
const fs = require("fs");

// Try to find complex.js relative to this test file
const complexPath = path.resolve(__dirname, "../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex module exports", () => {
  it("should have 'default' property pointing to the Complex constructor", () => {
    const Complex = require(complexPath);
    expect(Complex['default']).toBe(Complex);
  });
});