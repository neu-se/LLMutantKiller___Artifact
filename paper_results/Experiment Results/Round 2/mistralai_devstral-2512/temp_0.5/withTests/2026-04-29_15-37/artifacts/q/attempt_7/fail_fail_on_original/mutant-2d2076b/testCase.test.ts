// Test case to detect the mutation in Q.delay
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // Test with undefined timeout - should use single-argument path in original code
    const promise = Q.delay(void 0);

    // The promise should be fulfilled immediately with undefined value
    await expect(promise).resolves.toBeUndefined();

    // Test with a value and undefined timeout - should also use single-argument path
    const promise2 = Q.delay("test", void 0);
    await expect(promise2).resolves.toBe("test");
  });
});