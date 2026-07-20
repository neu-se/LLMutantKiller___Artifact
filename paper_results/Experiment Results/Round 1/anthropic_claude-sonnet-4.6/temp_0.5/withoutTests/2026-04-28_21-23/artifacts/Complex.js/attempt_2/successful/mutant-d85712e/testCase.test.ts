import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit followed by coefficient", () => {
  it("should correctly parse '1+i2' where i is followed by a number with positive sign", () => {
    // When parsing '1+i2', tokens = ['1', '+', 'i', '2']
    // When 'i' is encountered, tokens[i+1] = '2' and minus % 2 === 0 (positive)
    // Original: z['im'] += parseFloat('' + '2') = 2
    // Mutated:  z['im'] += parseFloat("Stryker was here!" + '2') = NaN
    const c = new Complex('1+i2');
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    expect(isNaN(c.im)).toBe(false);
  });
});