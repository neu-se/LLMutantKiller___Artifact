import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});