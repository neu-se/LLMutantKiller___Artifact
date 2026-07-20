// Test case to detect the mutation in Q.delay
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // Test 1: No timeout argument (should work the same in both versions)
    const promise1 = Q.delay(50);
    expect(promise1.isPending()).toBe(true);
    await promise1;

    // Test 2: Explicit undefined timeout
    // Original: timeout === void 0 → single argument path
    // Mutated: timeout !== void 0 → two argument path (will try to delay with undefined)
    const promise2 = Q.delay(undefined);

    // In original code, this should be treated as Q.delay() with no arguments
    // In mutated code, this would be treated as Q.delay(undefined, undefined)
    await expect(promise2).resolves.toBeUndefined();
  });
});