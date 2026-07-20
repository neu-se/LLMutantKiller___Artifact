import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit followed by number", () => {
  it("should correctly parse a complex number string where 'i' is followed by a coefficient like '2i3'", () => {
    // The mutation changes the empty string '' to 'Stryker was here!' when minus % 2 is falsy
    // This affects parsing when 'i' is encountered and the next token is a number
    // In the original: z['im'] += parseFloat('' + tokens[i + 1]) => parseFloat('3') = 3
    // In the mutated: z['im'] += parseFloat('Stryker was here!3') => parseFloat('Stryker was here!3') = NaN
    
    // Parse a string like "3i" where i is followed by nothing (standalone i)
    // Actually, let's test "i2" - where i comes before a number token
    // The code path: when c === 'i' and tokens[i+1] is a number
    // Original: z['im'] += parseFloat('' + '2') = 2
    // Mutated: z['im'] += parseFloat('Stryker was here!2') = NaN
    
    const c = new Complex('i2');
    expect(c.im).toBe(2);
    expect(c.re).toBe(0);
  });
});