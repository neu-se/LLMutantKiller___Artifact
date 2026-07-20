// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-9965e28/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking with stack traces", () => {
    it("should track rejection reasons with stack traces when available", async () => {
        // Create an error with a stack trace
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Wait for the unhandled rejection to be tracked
        await Q.delay(10);

        // Get the unhandled reasons
        const reasons = Q.getUnhandledReasons();

        // Verify that the stack trace was captured (not "(no stack)")
        expect(reasons.length).toBe(1);
        expect(reasons[0]).not.toContain("(no stack)");
        expect(reasons[0]).toContain("Error: Test error");

        // Clean up
        Q.resetUnhandledRejections();
    });
});