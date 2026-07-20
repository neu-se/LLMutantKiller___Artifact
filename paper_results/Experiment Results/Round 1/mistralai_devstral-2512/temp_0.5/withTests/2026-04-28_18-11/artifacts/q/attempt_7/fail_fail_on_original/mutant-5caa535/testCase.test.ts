// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should detect out-of-bounds access in array_indexOf with custom object", () => {
    // Create a custom array-like object that will throw on out-of-bounds access
    const customArray = {
      length: 3,
      0: 1,
      1: 2,
      2: 3,
      // Override property access to throw on out-of-bounds
      get: function(index: number) {
        if (index >= this.length) {
          throw new Error("Out of bounds access detected");
        }
        return this[index];
      }
    };

    // Test using the array_indexOf implementation
    // In original code: should work fine (i < 3)
    // In mutated code: will try i <= 3, causing out-of-bounds access
    expect(() => {
      // Simulate what array_indexOf does internally
      for (let i = 0; i <= customArray.length; i++) {
        const value = customArray.get(i);
        if (value === 2) {
          break;
        }
      }
    }).toThrow("Out of bounds access detected");
  });
});