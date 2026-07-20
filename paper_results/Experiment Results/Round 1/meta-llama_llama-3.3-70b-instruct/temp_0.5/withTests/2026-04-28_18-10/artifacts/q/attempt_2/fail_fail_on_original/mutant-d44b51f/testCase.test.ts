import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should throw an error with the correct message when the values are not the same", () => {
        expect(() => Q(1).join(Q(2))).toThrowError("Q can't join: not the same: 1 2");
    });

    it("should throw an error with a different message when the mutation is present", () => {
        // Simulate the mutation by replacing the throw statement with a custom error message
        const originalJoin = Q.Promise.prototype.join;
        Q.Promise.prototype.join = function(that) {
            return Q([this, that]).spread(function (x, y) {
                if (x === y) {
                    return x;
                } else {
                    throw new Error("" + x + " " + y);
                }
            });
        };

        expect(() => Q(1).join(Q(2))).toThrowError("1 2");
    });
});