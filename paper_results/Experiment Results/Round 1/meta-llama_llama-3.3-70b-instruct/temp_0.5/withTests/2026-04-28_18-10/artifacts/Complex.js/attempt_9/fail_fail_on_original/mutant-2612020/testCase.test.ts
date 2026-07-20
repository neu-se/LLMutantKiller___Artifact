import Complex from "../../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with an empty property', () => {
    expect(() => new Complex({})).toThrowError();
  });
});