import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    expect(result.re).toBeCloseTo(-0.8686709614860096, 10);
    expect(result.im).toBeCloseTo(-0.5253220923014726, 10);
  });
});