import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth(i) should equal -i*pi/4', () => {
    const result = new Complex(0, 1).acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 4, 10);
  });
});