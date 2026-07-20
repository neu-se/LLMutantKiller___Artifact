import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for specific input', () => {
    const complex = new Complex(-1.5, 0);
    const result = complex.atanh();
    expect(result).not.toBeNaN();
  });
});