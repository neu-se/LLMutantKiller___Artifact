import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the two promises resolve to the same value in the mutated code", () => {
        return Q.join(Q(1), Q(1)).then(
            (value) => {
                throw new Error("Expected Q.join to throw an error in the mutated code");
            }
        );
    });
});