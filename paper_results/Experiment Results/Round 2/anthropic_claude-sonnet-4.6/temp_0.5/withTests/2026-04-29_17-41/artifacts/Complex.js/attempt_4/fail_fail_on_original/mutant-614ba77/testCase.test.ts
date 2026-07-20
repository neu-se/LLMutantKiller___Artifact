describe("Complex module exports", () => {
  it("should have 'default' property pointing to the Complex constructor", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Complex = require("../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    expect(Complex['default']).toBe(Complex);
  });
});