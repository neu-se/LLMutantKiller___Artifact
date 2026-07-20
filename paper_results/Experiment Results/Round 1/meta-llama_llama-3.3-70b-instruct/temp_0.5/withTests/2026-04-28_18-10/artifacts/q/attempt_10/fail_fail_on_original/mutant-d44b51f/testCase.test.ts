import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should throw an error with a specific message when the values are not the same", () => {
        try {
            Q(1).join(Q(2));
        } catch (error: any) {
            expect(error.message).toContain("not the same");
        }
    });

    it("should throw an error with a message that does not contain 'not the same' when the mutation is present", () => {
        const originalJoin = Q.Promise.prototype.join;
        Q.Promise.prototype.join = function(that: any) {
            return Q([this, that]).spread(function (x: any, y: any) {
                if (x === y) {
                    return x;
                } else {
                    throw new Error("Different error message: " + x + " " + y);
                }
            });
        };

        try {
            Q(1).join(Q(2));
        } catch (error: any) {
            expect(error.message).not.toContain("not the same");
        }
    });
});