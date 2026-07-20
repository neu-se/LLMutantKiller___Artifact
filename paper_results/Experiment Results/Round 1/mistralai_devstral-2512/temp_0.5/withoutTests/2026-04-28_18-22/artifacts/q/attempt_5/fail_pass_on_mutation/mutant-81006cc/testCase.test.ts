// Test case to detect the mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation test", () => {
    it("should correctly invoke method using mapply with proper dispatch operation", (done) => {
        const testObject = {
            specialMethod: function(x: number, y: number) {
                return x * y;
            }
        };

        const promise = Q(testObject);
        const resultPromise = promise.mapply("specialMethod", [3, 4]);

        resultPromise.then((result: unknown) => {
            expect(result).toBe(12);
            done();
        }).catch((error: unknown) => {
            done(error);
        });
    });
});