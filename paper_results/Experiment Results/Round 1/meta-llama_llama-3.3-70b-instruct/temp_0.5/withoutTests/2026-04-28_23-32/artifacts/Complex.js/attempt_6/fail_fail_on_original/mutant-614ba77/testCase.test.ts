const Complex = require('./complex.js');

describe("Complex", () => {
  it("should have a default property", () => {
    expect(Complex.default).toBeDefined();
  });
});