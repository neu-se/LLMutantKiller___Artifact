const Complex = require("../../../../../../../../subject_repositories/Complex.js/complex.js");

describe("Complex module exports", () => {
  it("should have 'default' property pointing to the Complex constructor", () => {
    expect(Complex['default']).toBe(Complex);
  });
});