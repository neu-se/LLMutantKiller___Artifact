import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should use b parameter when a is null and b is provided', () => {
    // When a=null, b=5: original goes to null branch setting re=im=0
    // then falls to else-if(b !== undefined) setting re=null, im=5
    // Actually the if/else means only one branch runs
    const c = new Complex(null as any, 5);
    expect(c.im).toBe(5);
  });
});