import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with i followed by number", () => {
  it("should correctly parse a complex number string where i precedes its coefficient", () => {
    // When parsing a string like '1+i3', the 'i' token is followed by '3'
    // Original: parseFloat('' + '3') = 3
    // Mutated: parseFloat('Stryker was here!' + '3') = NaN
    const c = new Complex('1+i3');
    expect(c.re).toBe(1);
    expect(c.im).toBe(3);
  });
});