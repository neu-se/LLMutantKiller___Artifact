import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should reject if the two promises do not resolve to the same value", () => {
        return Q.join(Q(1), Q(2)).then(
            () => {
                throw new Error("Expected Q.join to reject");
            },
            (error) => {
                expect(error.message).toBe("Q can't join: not the same: 1 2");
            }
        );
    });
});