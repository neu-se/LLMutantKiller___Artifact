import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + 1i, we can verify csc(z) by checking csc(z) * sin(z) = 1
    const z = new Complex(1, 1);
    const cscZ = z.csc();
    const sinZ = z.sin();
    
    // csc(z) * sin(z) should equal 1 (i.e., re=1, im=0)
    const product = cscZ.mul(sinZ);
    
    expect(product.re).toBeCloseTo(1, 10);
    expect(product.im).toBeCloseTo(0, 10);
  });
});