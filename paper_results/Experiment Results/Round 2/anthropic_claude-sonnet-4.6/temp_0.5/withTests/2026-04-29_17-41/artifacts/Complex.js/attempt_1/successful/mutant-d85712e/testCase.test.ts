import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary coefficient", () => {
  it("should correctly parse a complex number string with explicit imaginary coefficient like '3i'", () => {
    // The mutation changes the empty string '' to 'Stryker was here!' when minus % 2 is falsy
    // This affects parsing of strings like '3i' where 'i' is followed by a number token
    // In the original: z['im'] += parseFloat('' + tokens[i + 1]) = parseFloat('3') = 3
    // In the mutated: z['im'] += parseFloat('Stryker was here!3') = NaN
    
    // Test case: parse '3i' - 'i' comes before '3', so tokens[i+1] = '3'
    // Wait, let me re-read: the token 'i' is encountered, then tokens[i+1] is the next token
    // Actually looking at the code: when 'i' is found and tokens[i+1] is a number,
    // it does: z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1])
    // The mutation changes '' to 'Stryker was here!'
    
    // A string like 'i3' won't parse correctly, but '3i' is handled differently
    // Let me think: in '3i', '3' comes first (handled as real or imaginary), then 'i'
    // Actually for 'i3': tokens = ['i', '3'], when we hit 'i', tokens[i+1] = '3'
    // so z['im'] += parseFloat('' + '3') = 3 in original
    // and z['im'] += parseFloat('Stryker was here!3') = NaN in mutated
    
    const c = new Complex('i3');
    expect(c.im).toBe(3);
    expect(c.re).toBe(0);
  });
});