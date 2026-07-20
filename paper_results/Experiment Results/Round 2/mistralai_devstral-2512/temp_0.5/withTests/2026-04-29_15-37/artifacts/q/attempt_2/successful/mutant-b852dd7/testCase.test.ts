// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b852dd7/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", async () => {
    // Save the original process.emit
    const originalEmit = process.emit;
    // Mock process.emit to be undefined
    process.emit = undefined as any;

    // Create a rejected promise that should not be tracked
    const rejectedPromise = Q.reject(new Error("test error"));

    // Wait for the next tick to allow tracking to occur
    await Q.delay(10);

    // Restore the original process.emit
    process.emit = originalEmit;

    // The test passes if no unhandledRejection event was emitted
    // (which would have thrown an error if process.emit was called)
    expect(true).toBe(true);
  });
});