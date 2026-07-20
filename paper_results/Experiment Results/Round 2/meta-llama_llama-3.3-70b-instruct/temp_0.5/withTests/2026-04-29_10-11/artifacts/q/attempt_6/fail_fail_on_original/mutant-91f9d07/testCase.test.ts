describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q.js");
        expect(() => Q.denodeify(undefined)).toThrowError("callback must be a function.");
    });

    it("should not throw an error when callback is undefined in the mutated code", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q.js");
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function (callback) {
            if (true) {
                return function () { };
            }
        };
        expect(() => Q.denodeify()).not.toThrowError();
    });
});