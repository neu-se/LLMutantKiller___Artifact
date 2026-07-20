import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calling ceil on a complex number in the mutated code', () => {
    const complex = new Complex(1.2, 3.4);
    expect(() => complex.ceil(1)).toThrowError();
  });
});