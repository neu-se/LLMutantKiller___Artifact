import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should return a real number (approximately 1.3169578969248166)
    const result = new Complex(2, 0).acosh();
    
    // In the original code, the else branch sets:
    //   tmp = res['im']
    //   res['im'] = -res['re']
    //   res['re'] = tmp   <-- this is the mutated line
    // The mutation changes res['re'] = tmp to res[''] = tmp
    // This means res['re'] won't be set correctly
    
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});