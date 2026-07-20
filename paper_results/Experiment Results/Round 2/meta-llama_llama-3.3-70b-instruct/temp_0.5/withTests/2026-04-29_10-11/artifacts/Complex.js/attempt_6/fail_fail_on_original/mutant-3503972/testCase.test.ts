import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.im).not.toBeNaN();
  });
});