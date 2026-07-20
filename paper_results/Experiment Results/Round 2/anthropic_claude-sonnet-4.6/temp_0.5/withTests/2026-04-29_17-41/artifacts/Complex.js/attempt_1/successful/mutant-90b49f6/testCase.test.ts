import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex string parser validation', () => {
  it('should throw SyntaxError when string has a trailing minus sign', () => {
    // In the original code: plus + minus > 0 => 0 + 1 > 0 => true => throws
    // In the mutated code:  plus - minus > 0 => 0 - 1 > 0 => false => no throw
    expect(() => {
      new Complex('1-');
    }).toThrow(SyntaxError);
  });
});