import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});