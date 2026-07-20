import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access im property after asinh on mutated code', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(() => complex[""]).toThrowError();
  });
});