import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.re).toBeCloseTo(-0.8686709614860096);
    expect(result.im).toBeCloseTo(-0.4040262255850639);
  });
});