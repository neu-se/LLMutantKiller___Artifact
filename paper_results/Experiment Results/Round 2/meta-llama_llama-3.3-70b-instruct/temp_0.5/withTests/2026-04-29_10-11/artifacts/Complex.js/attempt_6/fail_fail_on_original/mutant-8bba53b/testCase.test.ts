import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate cosm1 correctly for small x', () => {
    const x = 0.0001;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    const tolerance = 1e-10;
    expect(Math.abs(result - expected)).toBeLessThan(tolerance);
  });

  // it('should fail for mutated code', () => {
  //   const x = 0.0001;
  //   const result = Complex.cosm1(x);
  //   const expected = Math.cos(x) - 1 + 1/3628800;
  //   const tolerance = 1e-10;
  //   expect(Math.abs(result - expected)).toBeLessThan(tolerance);
  // });
});