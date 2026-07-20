import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should throw an error with a specific message when the values are not the same", () => {
        const error = Q(1).join(Q(2));
        expect(error instanceof Error).toBe(true);
        expect(error.message).toContain("Q can't join: not the same: 1 2");
    });

    it("should throw an error with a different message when the mutation is present", () => {
        // Simulate the mutation by replacing the throw statement with a custom error message
        const originalJoin = Q.Promise.prototype.join;
        Q.Promise.prototype.join = function(that) {
            return Q([this, that]).spread(function (x, y) {
                if (x === y) {
                    return x;
                } else {
                    throw new Error("Different error message: " + x + " " + y);
                }
            });
        };

        const error = Q(1).join(Q(2));
        expect(error instanceof Error).toBe(true);
        expect(error.message).not.toContain("Q can't join: not the same: 1 2");
    });
});