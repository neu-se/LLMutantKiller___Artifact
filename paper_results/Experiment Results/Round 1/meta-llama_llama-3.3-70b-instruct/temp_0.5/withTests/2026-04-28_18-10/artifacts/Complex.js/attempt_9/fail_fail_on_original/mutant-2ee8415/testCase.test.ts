import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a property "re" after calling asinh', () => {
    const complex = new Complex(1, 2);
    const res = complex.asinh();
    expect(Object.prototype.hasOwnProperty.call(res, 're')).toBe(true);
  });
});