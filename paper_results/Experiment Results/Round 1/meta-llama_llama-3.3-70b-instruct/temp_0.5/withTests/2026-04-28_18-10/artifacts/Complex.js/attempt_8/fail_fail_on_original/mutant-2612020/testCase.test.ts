import Complex from "./complex.js";

describe('Complex', () => {
  it('should not throw an error when parsing a complex number with an empty property in the mutated code', () => {
    expect(() => new Complex({ "": 1 })).not.toThrowError();
  });
});