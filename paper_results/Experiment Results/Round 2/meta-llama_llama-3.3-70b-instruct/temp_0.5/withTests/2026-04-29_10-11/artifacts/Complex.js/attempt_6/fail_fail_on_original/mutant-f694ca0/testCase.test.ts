import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should correctly handle the cosm1 function', () => {
    const smallX = 0.01;
    const result = Complex.cosm1(smallX);
    expect(result).not.toBeNaN();
  });
});