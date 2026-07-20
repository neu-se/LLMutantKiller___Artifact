// Test case to detect the mutation in Q.delay
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // Test the behavior when timeout is undefined
    // In original code: timeout === void 0 → treats as single argument (value)
    // In mutated code: timeout !== void 0 → treats as two arguments (value, timeout)

    // This should work the same in both versions (single argument)
    const promise1 = Q.delay(100);
    await expect(promise1).resolves.toBeUndefined();
    expect(promise1.isPending()).toBe(true);

    // This is where the mutation affects behavior
    // Original: undefined timeout → single argument path (immediate fulfillment)
    // Mutated: undefined timeout → two argument path (tries to delay with undefined)
    const promise2 = Q.delay("test", undefined);
    await expect(promise2).resolves.toBe("test");
  });
});