const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fbind", () => {
    it("should bind arguments and return a function that applies them when called", () => {
        const originalFunc = function(a: number, b: number, c: number) {
            return a + b + c;
        };

        const boundFunc = Q.fbind(originalFunc, 1, 2);
        return boundFunc(3).then((result: number) => {
            expect(result).toBe(6);
        });
    });
});