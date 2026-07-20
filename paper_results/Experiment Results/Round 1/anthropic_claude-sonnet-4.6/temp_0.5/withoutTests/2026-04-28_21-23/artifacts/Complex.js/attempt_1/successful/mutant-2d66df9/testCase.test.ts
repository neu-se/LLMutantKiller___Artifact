import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex string parsing with i token', () => {
  it('should correctly parse a complex number where plus equals minus before i', () => {
    // After parsing a number, plus=minus=0. Then seeing +- before i:
    // plus=1, minus=1 after reset. plus+minus=2≠0 (no exit), plus-minus=0 (exit in mutant)
    // String: '1+-i' - after '1' resets counters, then '+' makes plus=1, '-' makes minus=1
    // Then 'i': original: 1+1=2≠0 → no parser_exit, mutant: 1-1=0 → parser_exit
    const result = new Complex('1+-i');
    expect(result.re).toBe(1);
    expect(result.im).toBe(-1);
  });
});