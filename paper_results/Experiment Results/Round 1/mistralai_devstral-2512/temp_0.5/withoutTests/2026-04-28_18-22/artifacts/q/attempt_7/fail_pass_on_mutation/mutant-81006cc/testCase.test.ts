// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should correctly dispatch 'post' operation and fail with empty string dispatch", (done) => {
        const testObject = {
            testMethod: function(arg1: string, arg2: string) {
                return arg1 + arg2;
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("testMethod", ["a", "b"]);

        resultPromise.then((result: unknown) => {
            // This should only succeed with proper 'post' dispatch
            expect(result).toBe("ab");
            done();
        }).catch((error: unknown) => {
            // If we get here, the mutation is present (empty string dispatch fails)
            done(new Error("Mutation detected: empty string dispatch used instead of 'post'"));
        });
    });
});