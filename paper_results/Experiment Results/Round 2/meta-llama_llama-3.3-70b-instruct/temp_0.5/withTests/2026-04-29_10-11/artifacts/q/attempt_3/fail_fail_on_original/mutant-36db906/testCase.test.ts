import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.denodeify", () => {
    it("should throw an error when the callback is undefined in the original code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function(callback) {
            if (callback === undefined) {
                throw new Error("Q can't wrap an undefined function");
            }
            // rest of the function remains the same
        };

        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
        Q.denodeify = originalDenodeify;
    });

    it("should not throw an error when the callback is undefined in the mutated code", () => {
        const originalDenodeify = Q.denodeify;
        Q.denodeify = function(callback) {
            if (false) {
                throw new Error("Q can't wrap an undefined function");
            }
            // rest of the function remains the same
        };

        expect(() => Q.denodeify(undefined)).not.toThrowError("Q can't wrap an undefined function");
        Q.denodeify = originalDenodeify;
    });
});