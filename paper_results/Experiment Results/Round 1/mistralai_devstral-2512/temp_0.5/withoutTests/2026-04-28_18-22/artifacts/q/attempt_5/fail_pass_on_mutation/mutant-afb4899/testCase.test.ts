// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-afb4899/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
    it("should correctly parse stack traces with line numbers", () => {
        // Create a promise chain that will generate a stack trace
        return Q.reject(new Error("Test error")).then(
            () => {
                throw new Error("Should not resolve");
            },
            (err: Error) => {
                // Verify the error has a stack trace
                expect(err.stack).toBeDefined();

                // The mutation affects the regex pattern used to parse stack traces
                // We need to test this by creating a scenario where the stack trace
                // parsing is actually used by Q's internal mechanisms

                // Create a new error with a specific stack format that should match
                // the regex pattern in getFileNameAndLineNumber
                const testError = new Error();
                testError.stack = "Error\n    at Test.test (http://localhost:8080/test.js:42:21)";

                // Use Q's long stack trace support to trigger the parsing
                Q.longStackSupport = true;
                const deferred = Q.defer();
                deferred.reject(testError);

                return deferred.promise.then(
                    () => {
                        throw new Error("Should not resolve");
                    },
                    (finalErr: Error) => {
                        // The stack should be properly formatted
                        expect(finalErr.stack).toBeDefined();
                        expect(finalErr.stack!.includes("test.js:42:21")).toBe(true);

                        // The mutation would cause the regex to match incorrectly
                        // when there's extra text after the line number
                        const malformedStack = "Error\n    at Test.test (http://localhost:8080/test.js:42:21 extra)";
                        const malformedError = new Error();
                        malformedError.stack = malformedStack;

                        const malformedDeferred = Q.defer();
                        malformedDeferred.reject(malformedError);

                        return malformedDeferred.promise.then(
                            () => {
                                throw new Error("Should not resolve");
                            },
                            (malformedFinalErr: Error) => {
                                // With the original code, this should not match the pattern
                                // With the mutated code, it might incorrectly match
                                expect(malformedFinalErr.stack).toBeDefined();
                                return Q.resolve();
                            }
                        );
                    }
                );
            }
        );
    });
});