import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should reject if the two promises do not resolve to the same value", () => {
        return Q.join(Q(1), Q(1)).then(
            (value) => {
                expect(value).toBe(1);
            },
            (error) => {
                throw new Error("Expected Q.join to resolve with the joined value");
            }
        );
    });
});