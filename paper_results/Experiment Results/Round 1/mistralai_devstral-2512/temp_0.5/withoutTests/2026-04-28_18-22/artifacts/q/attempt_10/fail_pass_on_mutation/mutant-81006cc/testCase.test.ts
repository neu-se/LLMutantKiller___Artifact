// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should fail when dispatch operation is empty string instead of 'post'", (done) => {
        const testObject = {
            testMethod: function(arg1: string, arg2: string) {
                return arg1 + arg2;
            },
            // Add a method that will be called if dispatch uses empty string
            "": function() {
                return "WRONG_DISPATCH";
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("testMethod", ["a", "b"]);

        resultPromise.then((result: unknown) => {
            // In original code, should get "ab"
            // In mutated code, should get "WRONG_DISPATCH" or error
            expect(result).toBe("ab");
            done();
        }).catch((error: unknown) => {
            done(error);
        });
    });
});