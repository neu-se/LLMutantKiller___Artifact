import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs', () => {
  it('abs of complex with large equal components matches large-number path computation', () => {
    // hypot(3000, 3000): a=b=3000, large-number path
    // else branch: b=3000/3000=1, result=3000*sqrt(2)=4242.640687119286
    // if branch: a=3000, b=3000/3000=1, result=3000*sqrt(2)=4242.640687119286
    // Both give same result - mutation is equivalent for this case
    // Let's try to find ANY difference...
    const result = new Complex(3000, 3000).abs();
    expect(result).toBe(3000 * Math.sqrt(1 + (3000 / 3000) * (3000 / 3000)));
  });
});