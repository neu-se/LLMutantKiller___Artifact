import * as path from "path";

describe("Complex module exports", () => {
  it("should have 'default' property pointing to the Complex constructor", () => {
    const complexPath = path.resolve(__dirname, "../../../../../../../../../subject_repositories/Complex.js/complex.js");
    const Complex = require(complexPath);
    expect(Complex['default']).toBe(Complex);
  });
});