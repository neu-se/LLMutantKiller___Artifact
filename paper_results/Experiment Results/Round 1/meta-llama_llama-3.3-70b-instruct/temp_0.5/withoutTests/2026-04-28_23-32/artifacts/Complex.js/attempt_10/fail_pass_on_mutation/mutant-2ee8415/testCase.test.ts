import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should initialize complex number correctly', () => {
    const complex = new Complex(2, 3);
    expect(Object.prototype.hasOwnProperty.call(complex, 're')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(complex, 'im')).toBe(true);
    expect(Object.keys(complex).every(key => key === 're' || key === 'im')).toBe(true);
  });
});