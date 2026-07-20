import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calling acot with a mutated property', () => {
    const complex = new Complex(1, 2);
    const originalAcot = complex.acot;
    complex.acot = function() {
      var b = this['im'];
      var a = this[""];
      // rest of the function remains the same
    };
    expect(() => complex.acot()).toThrow();
  });
});