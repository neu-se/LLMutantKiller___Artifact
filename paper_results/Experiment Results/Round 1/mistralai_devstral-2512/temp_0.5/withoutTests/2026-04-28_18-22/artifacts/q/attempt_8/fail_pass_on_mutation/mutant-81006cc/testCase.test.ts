// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should fail when dispatch operation is empty string instead of 'post'", (done) => {
        const testObject = {
            testMethod: function(arg1: string, arg2: string) {
                return arg1 + arg2;
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("testMethod", ["a", "b"]);

        // Set a timeout to detect if the promise never resolves
        const timeout = setTimeout(() => {
            done(new Error("Promise never resolved - likely due to incorrect dispatch operation"));
        }, 100);

        resultPromise.then((result: unknown) => {
            clearTimeout(timeout);
            expect(result).toBe("ab");
            done();
        }).catch((error: unknown) => {
            clearTimeout(timeout);
            done(error);
        });
    });
});