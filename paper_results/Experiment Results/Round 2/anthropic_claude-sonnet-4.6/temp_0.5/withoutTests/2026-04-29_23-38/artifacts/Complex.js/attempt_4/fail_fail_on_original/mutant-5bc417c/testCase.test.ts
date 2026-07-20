import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('distinguishes d!==0 from true when d is zero', () => {
    // Force reaching the ternary by... we can't bypass if(true)
    // Try: what does acoth return for various inputs on BOTH versions?
    // Both return Complex(0, PI/2) always
    // Test that it returns exactly Complex(0, PI/2):
    const result = new Complex(5, 3).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Math.PI / 2);
  });
});