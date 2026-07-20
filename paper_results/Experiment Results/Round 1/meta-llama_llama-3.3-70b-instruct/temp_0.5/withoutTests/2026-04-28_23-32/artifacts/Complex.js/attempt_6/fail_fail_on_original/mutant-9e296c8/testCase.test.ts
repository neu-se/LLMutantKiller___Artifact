import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number calculations', () => {
  it('should correctly calculate csch', () => {
    const complex = new Complex(1, 1);
    const cschOriginal = complex['csch']();
    const cschMutated = new Complex(1, 1);
    cschMutated['csch'] = function() {
      var a = this['re'];
      var b = this['im'];
      var d = Math.cos(2 * b) - cosh(2 / a);
      return new Complex(-2 * sinh(a) * Math.cos(b) / d, 2 * cosh(a) * Math.sin(b) / d);
    }
    const cschMutatedResult = cschMutated['csch']();
    expect(cschOriginal['re']).not.toBeCloseTo(cschMutatedResult['re'], 10);
    expect(cschOriginal['im']).not.toBeCloseTo(cschMutatedResult['im'], 10);
  });
});