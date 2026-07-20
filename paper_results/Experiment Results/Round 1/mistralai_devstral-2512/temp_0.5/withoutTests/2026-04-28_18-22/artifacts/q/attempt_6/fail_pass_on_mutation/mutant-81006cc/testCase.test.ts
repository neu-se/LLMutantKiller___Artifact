// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should fail when dispatch operation is empty string instead of 'post'", (done) => {
        const testObject = {
            testMethod: function(arg1: string) {
                return "original: " + arg1;
            }
        };

        // Create a promise from the test object
        const promise = Q(testObject);

        // Use mapply to call the method
        const resultPromise = promise.mapply("testMethod", ["value"]);

        resultPromise.then((result: unknown) => {
            // In original code, this should succeed with the correct result
            expect(result).toBe("original: value");
            done();
        }).catch((error: unknown) => {
            // In mutated code, this should fail because empty string dispatch won't work
            done(error);
        });
    });
});