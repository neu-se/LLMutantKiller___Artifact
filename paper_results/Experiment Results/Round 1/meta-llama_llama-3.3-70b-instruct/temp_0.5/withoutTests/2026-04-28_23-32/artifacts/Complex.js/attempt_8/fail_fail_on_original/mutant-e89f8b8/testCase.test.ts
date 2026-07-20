import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.21723362801966385, 10);
    expect(result.im).toBeCloseTo(-0.21723362801966385, 10);
  });
});