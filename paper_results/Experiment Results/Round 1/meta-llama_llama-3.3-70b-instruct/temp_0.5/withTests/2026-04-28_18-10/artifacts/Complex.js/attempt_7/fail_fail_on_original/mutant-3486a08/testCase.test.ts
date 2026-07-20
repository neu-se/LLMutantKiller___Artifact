import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly compare two complex numbers for equality', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(1, 2);
    // The mutated code will always return true, so this test should fail on the mutated code
    expect(c1.equals(c3)).toBe(false);
  });
});