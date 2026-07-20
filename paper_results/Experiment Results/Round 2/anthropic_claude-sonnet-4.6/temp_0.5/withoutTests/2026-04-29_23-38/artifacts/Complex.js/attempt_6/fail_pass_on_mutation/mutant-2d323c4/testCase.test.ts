import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1+i) should return approximately 0.5306 + 0.4522i', () => {
    const result = new Complex(1, 1).acsch();
    expect(result.re).toBeCloseTo(0.5306375309525179, 10);
    expect(result.im).toBeCloseTo(-0.4522784471511907, 8);
  });
});