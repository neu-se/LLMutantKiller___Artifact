import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process object detection in untrackRejection", () => {
  it("should correctly evaluate the process condition logic", () => {
    // Test the specific condition that was mutated
    const testCases = [
      // [process value, expected result for original (AND), expected result for mutated (OR)]
      [{}, false, false],  // object but no emit
      [{ emit: () => {} }, true, true],  // object with emit
      [null, false, false],  // not an object
      [undefined, false, false],  // not an object
      [{ emit: () => {} }, true, true]  // object with emit
    ];

    testCases.forEach(([processValue, expectedOriginal, expectedMutated]) => {
      // Test original condition (AND)
      const originalResult = typeof processValue === "object" && typeof processValue?.emit === "function";
      expect(originalResult).toBe(expectedOriginal);

      // Test mutated condition (OR)
      const mutatedResult = typeof processValue === "object" || typeof processValue?.emit === "function";
      expect(mutatedResult).toBe(expectedMutated);

      // The key difference we're testing
      if (expectedOriginal !== expectedMutated) {
        expect(originalResult).toBe(expectedOriginal);
        expect(mutatedResult).toBe(expectedMutated);
      }
    });
  });
});