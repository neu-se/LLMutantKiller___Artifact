import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('sqrt of large complex number uses abs correctly', () => {
    const c = new Complex(4000, 4000);
    const s = c.sqrt();
    // sqrt(4000 + 4000i) should have specific re and im values
    const r = Math.sqrt(4000 * 4000 + 4000 * 4000); // = 4000*sqrt(2)
    const expectedRe = 0.5 * Math.sqrt(2 * (r + 4000));
    const expectedIm = Math.abs(4000) / Math.sqrt(2 * (r + 4000));
    expect(s.re).toBeCloseTo(expectedRe, 10);
    expect(s.im).toBeCloseTo(expectedIm, 10);
  });
});