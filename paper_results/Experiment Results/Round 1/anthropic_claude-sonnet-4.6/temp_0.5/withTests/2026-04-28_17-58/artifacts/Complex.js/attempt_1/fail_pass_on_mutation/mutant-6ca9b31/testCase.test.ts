import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with positive imaginary part correctly showing + sign", () => {
    const c = new Complex(3, 0);
    // When im is 0, returns just the real part
    expect(c.toString()).toBe("3");
    
    // When im > 0, should show "3 + 4i" format  
    const c2 = new Complex(3, 4);
    expect(c2.toString()).toBe("3 + 4i");
    
    // When im < 0, should show "3 - 4i" format
    const c3 = new Complex(3, -4);
    expect(c3.toString()).toBe("3 - 4i");
  });
});