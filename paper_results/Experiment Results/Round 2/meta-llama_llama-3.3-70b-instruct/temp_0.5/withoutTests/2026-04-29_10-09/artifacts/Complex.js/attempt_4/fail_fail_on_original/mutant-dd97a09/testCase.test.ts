import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a non-undefined value when sech method is called', () => {
    const complex = new Complex(1, 1);
    expect(complex.sech()).not.toBeUndefined();
  });
});