// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex division edge case", () => {
  it("should correctly handle division when |c| == |d|", () => {
    // This test targets the mutation by creating a case where Math.abs(c) == Math.abs(d)
    // In the original code, this would use the first branch (Math.abs(c) < Math.abs(d))
    // In the mutated code, this would use the first branch (Math.abs(c) <= Math.abs(d))
    // We need to find a case where the two branches produce different results

    // Create a case where c = 1, d = 1 (so |c| == |d|)
    // Divide (1+1i) by (1+1i) - should give (1+0i) in both cases, but let's verify
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, 1);
    const result = numerator.div(denominator);

    // The correct result should be (1+0i) since (1+1i)/(1+1i) = 1
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);

    // Now test a case where the two branches would produce different results
    // Let's use (2+2i) / (1+1i) - this should be (2+0i)
    const numerator2 = new Complex(2, 2);
    const denominator2 = new Complex(1, 1);
    const result2 = numerator2.div(denominator2);

    // The correct result should be (2+0i)
    expect(result2.re).toBeCloseTo(2, 10);
    expect(result2.im).toBeCloseTo(0, 10);

    // Test another edge case: (1+2i) / (2+1i)
    const numerator3 = new Complex(1, 2);
    const denominator3 = new Complex(2, 1);
    const result3 = numerator3.div(denominator3);

    // Calculate expected result manually:
    // (1+2i)/(2+1i) = [(1+2i)(2-1i)] / [(2+1i)(2-1i)] = [2-1i+4i-2i²]/[4-1i+2i-i²] = [2+3i+2]/[4+i+1] = (4+3i)/5 = 0.8 + 0.6i
    expect(result3.re).toBeCloseTo(0.8, 10);
    expect(result3.im).toBeCloseTo(0.6, 10);
  });
});