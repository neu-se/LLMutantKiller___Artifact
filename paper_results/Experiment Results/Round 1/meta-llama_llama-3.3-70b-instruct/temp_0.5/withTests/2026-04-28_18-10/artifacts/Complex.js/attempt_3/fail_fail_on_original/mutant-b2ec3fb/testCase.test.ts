import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when trying to floor with an invalid property', () => {
    const complex = new Complex(10.5, 2);
    expect(() => complex.floor(0)).not.toThrow();
    const mutatedComplex = Object.create(complex);
    mutatedComplex.floor = function(places) {
      return new Complex(Math.floor(this[""] * places) / places, Math.floor(this.im * places) / places);
    }
    expect(() => mutatedComplex.floor(0)).toThrow();
  });
});