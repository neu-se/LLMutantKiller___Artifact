// Test case to detect the mutation in Q.delay
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay mutation test", () => {
  it("should handle undefined timeout correctly", async () => {
    // Test the behavior when timeout is undefined
    // In original code: timeout === void 0 → treats as single argument (value)
    // In mutated code: timeout !== void 0 → treats as two arguments (value, timeout)

    // This is where the mutation affects behavior
    // Original: undefined timeout → single argument path (immediate fulfillment)
    // Mutated: undefined timeout → two argument path (tries to delay with undefined)
    const promise = Q.delay("test", undefined);

    // In original code, this should fulfill immediately with "test"
    // In mutated code, this would try to delay with undefined timeout
    await expect(promise).resolves.toBe("test");
  });
});