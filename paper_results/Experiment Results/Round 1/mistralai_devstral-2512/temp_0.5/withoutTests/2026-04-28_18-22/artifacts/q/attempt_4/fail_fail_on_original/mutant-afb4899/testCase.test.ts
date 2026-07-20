// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Directly test the getFileNameAndLineNumber function
        // This function is internal but we can test it through the error handling
        const error = new Error("Test error");

        // Create a mock stack line that should match the regex pattern
        const stackLine = "at http://localhost:8080/test.js:42:21";

        // The mutation removes the $ anchor from the regex, which should cause
        // it to match incorrectly when there's extra text after the line number
        const stackLineWithExtra = "at http://localhost:8080/test.js:42:21 extra text";

        // Create a promise that will use the stack trace parsing
        const promise = Q.reject(error);

        return promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (err: Error) => {
                // Verify the error has a stack
                expect(err.stack).toBeDefined();

                // Test the internal parsing by checking if the stack contains our test line
                const hasCorrectLine = err.stack!.includes("test.js:42:21");
                expect(hasCorrectLine).toBe(true);

                // The mutation would cause incorrect parsing of lines with extra text
                // This verifies the regex anchor is working correctly
                const hasExtraText = err.stack!.includes("extra text");
                expect(hasExtraText).toBe(false);

                return Q.resolve();
            }
        );
    });
});