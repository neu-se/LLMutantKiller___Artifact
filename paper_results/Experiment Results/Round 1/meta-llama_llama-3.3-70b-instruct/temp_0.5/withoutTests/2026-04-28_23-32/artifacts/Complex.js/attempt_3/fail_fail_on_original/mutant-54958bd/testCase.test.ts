import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acosh with invalid placeholder', () => {
    const complex = new Complex(2, 0);
    const acoshMethod = complex.acosh;
    const originalPlaceholder = "re";
    const mutatedPlaceholder = "";
    const originalCode = acoshMethod.toString();
    const mutatedCode = originalCode.replace(originalPlaceholder, mutatedPlaceholder);
    const mutatedAcoshMethod = new Function('return ' + mutatedCode)();
    expect(() => mutatedAcoshMethod()).toThrowError();
  });
});