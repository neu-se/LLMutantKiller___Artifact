import { Q } from "./q";

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIterationException = { toString: () => "[object StopIteration]" };

    // Test the isStopIteration function behavior
    // This should return true for StopIteration exceptions in the original code
    // but will return true for everything in the mutated code
    const result = Q.isStopIteration(stopIterationException);

    // In the original code, this should be true
    // In the mutated code, this will always be true (false positive)
    expect(result).toBe(true);

    // Now test with a non-StopIteration exception
    const regularException = new Error("Regular error");
    const result2 = Q.isStopIteration(regularException);

    // In the original code, this should be false
    // In the mutated code, this will be true (exposing the mutation)
    expect(result2).toBe(false);
  });
});