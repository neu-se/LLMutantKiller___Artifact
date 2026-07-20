import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary coefficient", () => {
  it("should correctly parse a complex number string with explicit imaginary coefficient like '3i'", () => {
    // The mutation changes the empty string '' to 'Stryker was here!' when minus % 2 === 0
    // This affects parsing when 'i' is followed by a number token (e.g., '3i' where 'i' comes before '3')
    // Actually, looking more carefully: the code checks if tokens[i+1] exists after 'i'
    // The placeholder is in the branch: if (tokens[i + 1] !== undefined && !isNaN(tokens[i + 1]))
    // Let's test parsing '3i' which should give im=3
    // In the mutated version, when minus%2===0 (positive), it would prepend 'Stryker was here!' to the number
    // making parseFloat('Stryker was here!3') = NaN instead of 3
    
    const c = new Complex('3i');
    expect(c.im).toBe(3);
    expect(c.re).toBe(0);
  });
});