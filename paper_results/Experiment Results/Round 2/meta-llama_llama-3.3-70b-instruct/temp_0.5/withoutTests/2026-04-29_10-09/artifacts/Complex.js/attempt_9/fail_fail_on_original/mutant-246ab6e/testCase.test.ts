describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(Math.cosh(1));
    expect(result.im).toBeCloseTo(0);

    const complexNegative = new Complex(-1, 0);
    const resultNegative = complexNegative.cosh();
    expect(resultNegative.re).toBeCloseTo(Math.cosh(-1));
    expect(resultNegative.im).toBeCloseTo(0);

    // Test the mutation by checking the cosh function with a value that will cause the mutation to produce incorrect results
    const complexMutationTest = new Complex(-2, 0);
    const resultMutationTest = complexMutationTest.cosh();
    expect(resultMutationTest.re).toBeCloseTo(Math.cosh(-2));
    expect(resultMutationTest.im).toBeCloseTo(0);
  });
});