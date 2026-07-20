import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Create a mock QReturnValue
    const QReturnValue = function(value: any) {
      this.value = value;
    };
    const qReturnValue = new QReturnValue("test");

    // Test that isStopIteration returns true for StopIteration
    // This should work in the original code but fail in the mutated version
    // when the exception is only a StopIteration (not also a QReturnValue)
    expect(Q.isStopIteration(stopIteration)).toBe(true);

    // Test that isStopIteration returns true for QReturnValue
    // This should work in both original and mutated code
    expect(Q.isStopIteration(qReturnValue)).toBe(true);

    // Test that isStopIteration returns false for regular errors
    expect(Q.isStopIteration(new Error("test"))).toBe(false);
  });
});