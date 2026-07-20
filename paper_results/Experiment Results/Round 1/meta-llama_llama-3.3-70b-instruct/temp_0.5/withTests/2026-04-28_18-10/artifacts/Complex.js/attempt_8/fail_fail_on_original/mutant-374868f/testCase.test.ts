import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(1);
  });
});