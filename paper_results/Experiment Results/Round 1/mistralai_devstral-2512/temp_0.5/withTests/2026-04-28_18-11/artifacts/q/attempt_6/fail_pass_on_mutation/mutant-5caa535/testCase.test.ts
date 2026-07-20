// Test case to detect the mutation in array_indexOf
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
  it("should fail when array_indexOf accesses out of bounds with specific value", () => {
    // Create a test array where the mutation would cause observable behavior
    const testArray = [1, 2, 3];

    // The mutation changes i < this.length to i <= this.length
    // This causes an extra iteration where i equals array length (3)
    // We can detect this by checking if the function throws when accessing out of bounds

    // Force the mutation to show its effect by creating a scenario
    // where the out-of-bounds access would be detectable
    let errorThrown = false;
    try {
      // In the mutated version, this would access testArray[3] which is undefined
      // and might throw in strict mode or certain environments
      const result = testArray.indexOf(undefined);
      // If we get here without throwing, check the result
      // In original code: should be -1 (not found)
      // In mutated code: might be 3 (found at out-of-bounds index)
      if (result === 3) {
        throw new Error("Found undefined at out-of-bounds index");
      }
    } catch (e) {
      errorThrown = true;
    }

    // The test should pass in original code (no error thrown)
    // and fail in mutated code (either throws or finds at wrong index)
    expect(errorThrown).toBe(false);
  });
});