import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeInfinity();
    expect(result.im).not.toBeInfinity();
  });
});