import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when calculating acosh with mutated code', () => {
    const complex = new Complex(2, 0);
    const acoshMethod = complex.acosh;
    const originalCode = acoshMethod.toString();
    const mutatedCode = originalCode.replace('var tmp = res["re"];', 'var tmp = res[""];');
    const mutatedAcoshMethod = new Function('return ' + mutatedCode)();
    expect(() => mutatedAcoshMethod()).toThrowError();
  });
});