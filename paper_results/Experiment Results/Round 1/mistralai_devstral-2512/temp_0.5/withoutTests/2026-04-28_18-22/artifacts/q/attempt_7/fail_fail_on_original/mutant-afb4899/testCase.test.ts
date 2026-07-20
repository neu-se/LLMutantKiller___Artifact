// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Test the specific regex pattern that was mutated
        // The mutation removes the $ anchor from: /at ([^ ]+):(\d+):(?:\d+)$/
        // This makes the regex match lines with extra content after the column number

        // Create an error with a properly formatted stack line
        const error = new Error("Test error");
        error.stack = "Error\n    at Test.test (http://localhost:8080/test.js:42:21)";

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
                // Verify the stack trace is properly formatted
                expect(err.stack).toBeDefined();
                expect(err.stack!.includes("test.js:42:21")).toBe(true);

                // Now test with a malformed stack line that has extra text
                const malformedError = new Error("Malformed error");
                malformedError.stack = "Error\n    at Test.test (http://localhost:8080/malformed.js:99:99) EXTRA_TEXT";

                const malformedDeferred = Q.defer();
                malformedDeferred.reject(malformedError);

                return malformedDeferred.promise.then(
                    () => {
                        throw new Error("Should not resolve");
                    },
                    (malformedErr: Error) => {
                        // With original code (with $ anchor), the malformed line should be filtered out
                        // With mutated code (without $ anchor), it might be incorrectly included
                        expect(malformedErr.stack).toBeDefined();

                        // The original code should filter out malformed lines
                        // The mutated code would incorrectly keep them
                        const hasExtraText = malformedErr.stack!.includes("EXTRA_TEXT");
                        expect(hasExtraText).toBe(false);

                        return Q.resolve();
                    }
                );
            }
        );
    });
});