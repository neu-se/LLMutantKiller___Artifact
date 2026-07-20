import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly handle the z object not having spurious properties affecting re initialization", () => {
    // The mutation changes z['re']=0 to z[""]=0 in chained assignment
    // Both result in z['re']=0 via next line
    // But test if z[""] property being set via different path matters
    // Try parsing a string that starts with a real number followed by imaginary
    const c1 = new Complex("1+1i");
    const c2 = new Complex(1, 1);
    expect(c1.re).toBe(c2.re);
    expect(c1.im).toBe(c2.im);
    
    // Test negative real with positive imaginary  
    const c3 = new Complex("-2+3i");
    expect(c3.re).toBe(-2);
    expect(c3.im).toBe(3);
    
    // Test that re is 0 when only imaginary specified
    const c4 = new Complex("5i");
    expect(c4.re).toBe(0);
    expect(c4.im).toBe(5);
  });
});