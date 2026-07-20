// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Test the specific regex pattern that was mutated
        // The mutation removes the $ anchor from the regex: /at ([^ ]+):(\d+):(?:\d+)$/
        // This test creates a scenario where the anchor is crucial

        // Create an error with a stack line that has extra text after the line number
        const error = new Error("Test error");
        error.stack = "Error\n    at Test.test (http://localhost:8080/test.js:42:21) extra text here";

        // Enable long stack traces to trigger the parsing
        Q.longStackSupport = true;

        // Create a rejected promise with this error
        const deferred = Q.defer();
        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (err: Error) => {
                // With the original code (with $ anchor), the regex should NOT match
                // because of the extra text after the line number
                // With the mutated code (without $ anchor), the regex WILL match
                // and incorrectly parse the line

                // The original code should filter out this line as it doesn't match
                // the expected pattern, while the mutated code would include it
                expect(err.stack).toBeDefined();

                // This test verifies that the stack trace filtering works correctly
                // The original code should not include malformed lines in the filtered stack
                const hasMalformedLine = err.stack!.includes("extra text here");
                expect(hasMalformedLine).toBe(false);

                return Q.resolve();
            }
        );
    });
});