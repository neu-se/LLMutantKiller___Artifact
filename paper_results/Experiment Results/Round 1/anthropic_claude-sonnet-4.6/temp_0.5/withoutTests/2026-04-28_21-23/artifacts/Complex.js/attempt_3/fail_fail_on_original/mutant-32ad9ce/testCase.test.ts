import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parsing", () => {
  it("should return NaN complex when parsing object with one NaN component", () => {
    // With original ||: condition true when re=NaN, im=0 → enters if block
    // With mutated &&: condition false when re=NaN, im=0 → skips if block
    // If the if block resets values or does something, behavior differs
    // Testing: parse {re: NaN, im: 0} - original enters if, mutated doesn't
    const c1 = new Complex({ re: NaN, im: 0 });
    const c2 = new Complex({ re: 0, im: NaN });
    
    // Both should be NaN regardless
    expect(c1.isNaN()).toBe(true);
    expect(c2.isNaN()).toBe(true);
    
    // The real difference: with &&, when BOTH are NaN the if triggers
    // With ||, when EITHER is NaN the if triggers
    // If the if block calls parser_exit (throws), then:
    // Original: new Complex(NaN, NaN) throws
    // Mutated: new Complex(NaN, NaN) also throws (both NaN)
    // But new Complex(NaN, 0): Original throws, Mutated doesn't
    expect(() => new Complex(NaN, 0)).toThrow();
  });
});