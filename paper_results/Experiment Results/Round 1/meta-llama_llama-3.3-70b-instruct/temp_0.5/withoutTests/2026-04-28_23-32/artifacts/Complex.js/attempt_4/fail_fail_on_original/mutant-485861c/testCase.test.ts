import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have im property initialized when created with undefined input', () => {
    const complex = new Complex();
    expect(complex).toHaveProperty('im');
    expect(complex.im).toBe(0);
  });
});