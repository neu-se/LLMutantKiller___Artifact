// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Test the specific regex pattern that was mutated
        // The mutation removes the $ anchor from: /at ([^ ]+):(\d+):(?:\d+)$/
        // This makes the regex match lines with extra content after the column number

        // Create a promise chain that will generate a stack trace
        return Q.reject(new Error("Test error")).then(
            () => {
                throw new Error("Should not resolve");
            },
            (err: Error) => {
                // Verify the error has a stack
                expect(err.stack).toBeDefined();

                // Create a new error with a specific stack format that should match
                // the regex pattern in getFileNameAndLineNumber
                const testError = new Error();
                testError.stack = "Error\n    at Test.test (http://localhost:8080/test.js:42:21)";

                // Enable long stack traces
                Q.longStackSupport = true;

                // Create a deferred that will use the stack trace parsing
                const deferred = Q.defer();
                deferred.reject(testError);

                return deferred.promise.then(
                    () => {
                        throw new Error("Should not resolve");
                    },
                    (finalErr: Error) => {
                        // The stack should be properly formatted
                        expect(finalErr.stack).toBeDefined();

                        // Now test with a malformed stack line
                        const malformedError = new Error();
                        malformedError.stack = "Error\n    at Test.test (http://localhost:8080/malformed.js:99:99) EXTRA_TEXT";

                        const malformedDeferred = Q.defer();
                        malformedDeferred.reject(malformedError);

                        return malformedDeferred.promise.then(
                            () => {
                                throw new Error("Should not resolve");
                            },
                            (malformedFinalErr: Error) => {
                                // The original code should filter out malformed lines
                                // The mutated code would incorrectly keep them
                                expect(malformedFinalErr.stack).toBeDefined();

                                // Check if the stack contains the malformed line
                                // The original code should have filtered it out
                                const hasMalformedLine = malformedFinalErr.stack!.includes("EXTRA_TEXT");
                                expect(hasMalformedLine).toBe(false);

                                return Q.resolve();
                            }
                        );
                    }
                );
            }
        );
    });
});