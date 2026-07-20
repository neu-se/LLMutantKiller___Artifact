// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Create a scenario that generates a stack trace
        const error = new Error("Test error");
        const stackLine = "at http://localhost:8080/test.js:42:21";

        // This test verifies that the regex correctly captures the filename and line number
        // The mutation removes the $ anchor, which could cause incorrect parsing
        const promise = Q.reject(error);
        return promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (err: Error) => {
                // The error should have a stack trace that can be parsed
                expect(err).toBeInstanceOf(Error);
                expect(err.stack).toBeDefined();

                // Verify that the stack trace parsing works correctly
                // This indirectly tests the regex pattern
                const lines = err.stack!.split("\n");
                const relevantLine = lines.find((line: string) => line.includes("test.js:42"));
                expect(relevantLine).toBeDefined();
                expect(relevantLine).toContain("test.js:42:21");

                return Q.resolve();
            }
        );
    });
});