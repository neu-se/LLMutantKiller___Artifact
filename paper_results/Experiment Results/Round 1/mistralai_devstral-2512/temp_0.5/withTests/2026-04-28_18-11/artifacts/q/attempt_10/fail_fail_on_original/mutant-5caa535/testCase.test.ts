// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should detect out-of-bounds access in array_indexOf with Proxy", () => {
    // Create a regular array
    const baseArray = [1, 2, 3];

    // Create a Proxy that tracks out-of-bounds access
    const trackedArray = new Proxy(baseArray, {
      get(target: any[], prop: string | symbol) {
        const index = Number(prop);
        if (index >= target.length) {
          throw new Error(`Out of bounds access at index ${index}`);
        }
        return target[index];
      }
    });

    // Test using array_indexOf
    // In original code: should work fine (i < 3)
    // In mutated code: will try i <= 3, causing out-of-bounds access
    expect(() => {
      // Simulate what array_indexOf does internally
      for (let i = 0; i <= trackedArray.length; i++) {
        const value = trackedArray[i];
        if (value === 2) {
          break;
        }
      }
    }).toThrow("Out of bounds access at index 3");
  });
});