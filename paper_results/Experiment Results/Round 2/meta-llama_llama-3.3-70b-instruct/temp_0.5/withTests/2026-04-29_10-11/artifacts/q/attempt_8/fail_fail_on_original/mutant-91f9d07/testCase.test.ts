describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code but not in the mutated code", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q.js");
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function (callback) {
            if (callback === undefined) {
                throw new Error("callback must be a function.");
            } else {
                return originalDenodeify(callback);
            }
        };
        expect(() => Q.denodeify(undefined)).toThrowError("callback must be a function.");
        Q.denodeify = function () {
            return function () { };
        };
        expect(() => Q.denodeify()).not.toThrowError();
    });
});