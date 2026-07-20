import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when trying to floor with an undefined property', () => {
    const complex = new Complex(1.2345, 6.789);
    expect(() => complex.floor(2)).not.toThrow();
    const mutatedComplex = new Complex(1.2345, 6.789);
    // Simulate the mutation by setting the property to undefined
    mutatedComplex[""] = undefined;
    expect(() => mutatedComplex.floor(2)).toThrow();
  });
});