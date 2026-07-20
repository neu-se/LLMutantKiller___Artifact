// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should fail when dispatch operation is empty string instead of 'post'", (done) => {
        const testObject = {
            testMethod: function(arg1: string, arg2: string) {
                return arg1 + " " + arg2;
            },
            // Add a method that will be called if dispatch uses empty string
            "": function() {
                throw new Error("Empty string dispatch called");
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("testMethod", ["Hello", "World"]);

        resultPromise.then((result: unknown) => {
            // This should only succeed if 'post' operation is used correctly
            expect(result).toBe("Hello World");
            done();
        }).catch((error: unknown) => {
            // If we get here with empty string dispatch, it means the mutation is present
            done(error);
        });
    });
});