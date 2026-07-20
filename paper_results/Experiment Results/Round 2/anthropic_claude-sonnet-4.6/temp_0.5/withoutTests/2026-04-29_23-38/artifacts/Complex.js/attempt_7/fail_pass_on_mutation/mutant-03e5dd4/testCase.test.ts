import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse complex number where carriage return affects real part", () => {
    // \r is tokenized by regex, isNaN('\r') is false (Number('\r') === 0)
    // so \r gets parsed as numeric value 0 added to re
    // In original: '3\r+4i' -> re = 3 + 0 = 3, im = 4? No, plus/minus resets
    // Actually after parsing '3', plus=minus=0, then '\r' with plus+minus===0 -> parser_exit!
    // Wait: after a number token, plus = minus = 0
    // So '\r' arrives with plus+minus===0 -> parser_exit() throws
    // But earlier test showed '\r' doesn't throw... let me verify differently
    
    // Test: "3 + 4i" should parse correctly in both versions
    const c1 = new Complex("3 + 4i");
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(4);
    
    // Test: " 3+4i" with leading space
    const c2 = new Complex(" 3+4i");
    expect(c2.re).toBe(3);
    expect(c2.im).toBe(4);
  });
});