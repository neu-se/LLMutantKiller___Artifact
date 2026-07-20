import { Complex } from './complex';

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers', () => {
    const c1 = new Complex('1i');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);

    const c2 = new Complex('1');
    expect(c2.im).toBe(0);

    // This test should pass in the original code and fail in the mutated code
    const c3 = new Complex('i');
    expect(c3.im).toBe(1);
  });
});