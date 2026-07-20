import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly handle log function for complex numbers', () => {
    const complex = new Complex(-1, 0);
    const logResult = complex.log();
    expect(logResult.re).toBeCloseTo(Math.log(1), 5);
    expect(logResult.im).toBeCloseTo(Math.PI, 5);
  });
});