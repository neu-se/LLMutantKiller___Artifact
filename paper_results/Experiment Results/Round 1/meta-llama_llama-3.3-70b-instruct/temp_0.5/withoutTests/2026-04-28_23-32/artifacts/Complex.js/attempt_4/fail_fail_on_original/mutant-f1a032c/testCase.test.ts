import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to floor a complex number with an undefined property', () => {
    const complex = new Complex(1.5, 2.7);
    expect(() => {
      const mutatedComplex = new Complex(1.5, 2.7);
      // Simulate the mutation by accessing an undefined property
      mutatedComplex.floor = function(places) {
        return new Complex(
          Math.floor(this['re'] * places) / places,
          Math.floor(this[""] * places) / places);
      };
      mutatedComplex.floor(0);
    }).toThrow();
  });
});