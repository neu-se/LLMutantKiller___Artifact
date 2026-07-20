import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a purely real string with im equal to 0", () => {
    const c = new Complex("5");
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
    
    const c2 = new Complex("3+2i");
    expect(c2.re).toBe(3);
    expect(c2.im).toBe(2);
    
    // A string with only imaginary part
    const c3 = new Complex("4i");
    expect(c3.re).toBe(0);
    expect(c3.im).toBe(4);
  });
});