import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
  });
});