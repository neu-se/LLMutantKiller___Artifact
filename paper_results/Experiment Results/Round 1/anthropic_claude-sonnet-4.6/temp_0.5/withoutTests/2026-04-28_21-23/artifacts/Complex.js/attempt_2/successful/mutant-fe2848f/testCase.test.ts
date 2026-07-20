import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should compute atanh(2+i) with correct imaginary part", () => {
    // For a=2, b=1:
    // Original: noIM = (2>1) && (1===0) = false => imaginary not negated
    // Mutated:  noIM = (2>1) || (1===0) = true  => imaginary negated
    const result = new Complex(2, 1).atanh();
    // Reference: atanh(2+i) computed via known formula
    // atanh(z) = log((1+z)/(1-z))/2
    // (1+(2+i))/(1-(2+i)) = (3+i)/(-1-i) = (3+i)/(-1-i) * (-1+i)/(-1+i) = (-3+3i-i+i^2)/(1+1) = (-4+2i)/2 = -2+i
    // log(-2+i): abs = sqrt(5), arg = pi - atan(1/2)
    // re = log(sqrt(5))/2 = log(5)/4
    // im = (pi - atan(0.5))/2
    const expectedIm = (Math.PI - Math.atan(0.5)) / 2;
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});