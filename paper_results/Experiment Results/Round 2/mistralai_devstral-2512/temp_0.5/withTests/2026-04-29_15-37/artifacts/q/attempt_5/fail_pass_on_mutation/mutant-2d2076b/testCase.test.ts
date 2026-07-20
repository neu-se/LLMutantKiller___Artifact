// Test case to detect the mutation in Q.delay
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // Test with undefined timeout - should use single-argument path in original code
    const promise1 = Q.delay(undefined as any);
    await expect(promise1).resolves.toBeUndefined();

    // Test with explicit undefined - should behave the same
    const promise2 = Q.delay(void 0);
    await expect(promise2).resolves.toBeUndefined();

    // Both should be fulfilled immediately
    expect(promise1.isFulfilled()).toBe(true);
    expect(promise2.isFulfilled()).toBe(true);
  });
});