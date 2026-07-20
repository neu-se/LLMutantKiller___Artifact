import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the two promises resolve to different values", () => {
        return Q.join(Q(1), Q(2)).then(
            (value) => {
                throw new Error("Expected Q.join to reject");
            }
        ).catch((error) => {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});