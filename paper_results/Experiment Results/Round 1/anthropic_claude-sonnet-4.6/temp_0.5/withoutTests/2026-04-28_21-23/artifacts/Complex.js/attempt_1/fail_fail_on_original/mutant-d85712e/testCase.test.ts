import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary part followed by number", () => {
  it("should correctly parse a complex number like '2i3' where i is followed by a number", () => {
    // The mutation changes the empty string '' to "Stryker was here!" when minus % 2 is falsy
    // This affects parsing when 'i' is encountered and the next token is a number
    // In the original: z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1])
    // In the mutated: z['im'] += parseFloat((minus % 2 ? '-' : "Stryker was here!") + tokens[i + 1])
    // "Stryker was here!3" would parse as NaN, while '' + '3' = '3' parses as 3
    
    // Parse a string where 'i' is followed by a number token (positive case, minus % 2 === 0)
    const c = new Complex('3i2');
    // In original: im = parseFloat('' + '2') = 2
    // In mutated: im = parseFloat("Stryker was here!" + '2') = NaN
    expect(isNaN(c.im)).toBe(false);
    expect(c.im).toBe(2);
    expect(c.re).toBe(3);
  });
});