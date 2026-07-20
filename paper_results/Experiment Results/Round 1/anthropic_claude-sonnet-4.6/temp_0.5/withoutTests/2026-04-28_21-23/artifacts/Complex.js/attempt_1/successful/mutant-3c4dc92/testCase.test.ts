import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number where oneMinus differs from 1", () => {
    // For atanh, the key variables are:
    // oneMinus = 1 - a
    // onePlus = 1 + a  (but in mutated code, onePlus = 1 - a, same as oneMinus)
    // d = oneMinus * oneMinus + b * b  (original)
    // d = oneMinus / oneMinus + b * b  (mutated: = 1 + b*b when oneMinus != 0)
    
    // Let's pick a = 0.5, b = 0.5
    // oneMinus = 1 - 0.5 = 0.5
    // onePlus = 1 + 0.5 = 1.5 (original), but in code it's 1 - a = 0.5 (bug in original code too)
    // Wait, let me re-read the code...
    
    // The mutation is in `d`:
    // Original: d = oneMinus * oneMinus + b * b = 0.5*0.5 + 0.5*0.5 = 0.25 + 0.25 = 0.5
    // Mutated:  d = oneMinus / oneMinus + b * b = 1 + 0.25 = 1.25
    
    // This changes the result of atanh for complex numbers with non-zero imaginary part
    // Let's use a = 0, b = 0.5 (pure imaginary)
    // oneMinus = 1 - 0 = 1
    // oneMinus / oneMinus = 1 (same as oneMinus * oneMinus = 1 when oneMinus = 1)
    // So for a=0, the mutation doesn't matter. Need a != 0.
    
    // Use a = 0.5, b = 1.0
    // Original d = (0.5)^2 + 1^2 = 0.25 + 1 = 1.25
    // Mutated  d = 0.5/0.5 + 1^2 = 1 + 1 = 2
    
    const z = new Complex(0.5, 1.0);
    const result = z.atanh();
    
    // The correct value of atanh(0.5 + i) can be computed analytically
    // atanh(z) = log((1+z)/(1-z)) / 2
    // 1+z = 1.5 + i, 1-z = 0.5 - i
    // (1.5+i)/(0.5-i) = (1.5+i)(0.5+i) / ((0.5)^2 + 1) = (0.75 + 1.5i + 0.5i - 1) / 1.25
    //                 = (-0.25 + 2i) / 1.25 = -0.2 + 1.6i
    // log(-0.2 + 1.6i) = log(sqrt(0.04 + 2.56)) + i*atan2(1.6, -0.2)
    //                  = log(sqrt(2.6)) + i*atan2(1.6, -0.2)
    //                  = 0.5*log(2.6) + i*(pi - atan(8))
    // atanh(0.5+i) = (0.5*log(2.6) + i*(pi - atan(8))) / 2
    //             = 0.25*log(2.6) + i*(pi - atan(8))/2
    
    const expectedRe = 0.25 * Math.log(2.6);
    const expectedIm = (Math.PI - Math.atan(8)) / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});