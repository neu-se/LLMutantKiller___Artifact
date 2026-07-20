import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error with a meaningful message when the values are not the same", () => {
        expect(() => Q.join(1, 2)).toThrowError("Q can't join: not the same: 1 2");
    });

    it("should throw an error without a meaningful message when the mutation is present", () => {
        // Simulate the mutation by replacing the original error message
        const originalErrorMessage = "Q can't join: not the same: ";
        const mutatedErrorMessage = "";
        const join = Q.join;
        const originalJoin = Q.join;
        Q.join = function(x, y) {
            if (x !== y) {
                throw new Error(mutatedErrorMessage + x + " " + y);
            }
            return x;
        }

        expect(() => Q.join(1, 2)).toThrowError("1 2");

        // Restore the original Q.join function
        Q.join = originalJoin;
    });
});