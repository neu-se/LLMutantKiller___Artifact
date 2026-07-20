import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly', () => {
    const complex1 = new Complex(1, 1);
    const complex2 = new Complex(1, -1);
    expect(complex1.acsc().toString()).not.toBe(complex2.acsc().toString());
  });
});