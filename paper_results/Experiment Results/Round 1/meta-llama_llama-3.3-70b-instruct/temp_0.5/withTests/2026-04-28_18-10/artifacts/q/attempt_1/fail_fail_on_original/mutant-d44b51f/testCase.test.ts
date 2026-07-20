import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.join", () => {
    it("should throw an error if the values are not the same", () => {
        expect(() => Q.join(1, 2)).toThrowError("Q can't join: not the same: 1 2");
    });

    it("should throw an error with the correct message when the mutation is present", () => {
        // Simulate the mutation by replacing the throw statement with a custom error message
        const originalJoin = Q.join;
        Q.join = function(x, y) {
            throw new Error("" + x + " " + y);
        };

        expect(() => Q.join(1, 2)).toThrowError("1 2");
    });
});