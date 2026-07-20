import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a real number from string and have re property set to 0 initially before accumulation", () => {
    // The mutation changes `z['re'] = 0` to `z[""] = 0` in the string parsing branch
    // This means z['re'] is never initialized to 0, so when parsing a string like "5",
    // the re property won't be properly reset and will use the prototype default (0)
    // but more importantly, if we parse a string with only imaginary part like "3i",
    // the re should be 0, not undefined or some garbage value
    
    // Parse a purely imaginary number - re should be exactly 0
    const c1 = new Complex("3i");
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(3);
    
    // Parse a real number from string
    const c2 = new Complex("5");
    expect(c2.re).toBe(5);
    expect(c2.im).toBe(0);
    
    // Parse a complex number - the real part should accumulate correctly from 0
    const c3 = new Complex("2+3i");
    expect(c3.re).toBe(2);
    expect(c3.im).toBe(3);
    
    // The key test: when re is not initialized to 0, adding to it with +=
    // would result in NaN if re is undefined (undefined + number = NaN)
    // With the mutation, z['re'] is never set to 0, so z['re'] starts as undefined
    // and parseFloat(...) + undefined = NaN
    const c4 = new Complex("7");
    expect(isNaN(c4.re)).toBe(false);
    expect(c4.re).toBe(7);
  });
});