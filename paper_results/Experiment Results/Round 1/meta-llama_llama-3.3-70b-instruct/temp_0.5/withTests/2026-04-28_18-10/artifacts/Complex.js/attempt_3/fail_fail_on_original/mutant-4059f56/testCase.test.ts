import { Complex } from './complex';

describe('Complex', () => {
  it('should clone correctly', () => {
    const complex = new Complex(1, 2);
    const clone = complex.clone();
    expect(clone.re).toBe(complex["re"]); // Notice the change here
    expect(clone.im).toBe(complex.im);
  });
});