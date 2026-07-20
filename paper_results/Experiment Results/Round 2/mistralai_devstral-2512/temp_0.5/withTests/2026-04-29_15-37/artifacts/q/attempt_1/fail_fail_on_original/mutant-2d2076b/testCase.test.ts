// Test case to detect the mutation in Q.delay
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // This test verifies that Q.delay behaves correctly when timeout is undefined
    // In the original code, timeout === void 0 should trigger the single-argument path
    // In the mutated code, timeout !== void 0 would incorrectly trigger the two-argument path
    const promise = Q.delay(undefined as any);

    // The promise should eventually fulfill (with undefined value)
    await expect(promise).resolves.toBeUndefined();

    // Also test that it's actually pending initially
    expect(promise.isPending()).toBe(true);
  });
});