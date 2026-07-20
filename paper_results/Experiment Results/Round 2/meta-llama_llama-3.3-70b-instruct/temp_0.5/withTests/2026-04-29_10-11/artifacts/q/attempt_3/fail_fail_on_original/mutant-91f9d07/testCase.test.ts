import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function (callback) {
            if (callback === undefined) {
                throw new Error("callback must be a function.");
            }
            return originalDenodeify(callback);
        };
        expect(() => Q.denodeify(undefined)).toThrowError("callback must be a function.");
    });

    it("should not throw an error when callback is undefined in the mutated code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function (callback) {
            if (true) {
                // do nothing
            }
            return originalDenodeify(callback);
        };
        expect(() => Q.denodeify(undefined)).not.toThrowError();
    });
});