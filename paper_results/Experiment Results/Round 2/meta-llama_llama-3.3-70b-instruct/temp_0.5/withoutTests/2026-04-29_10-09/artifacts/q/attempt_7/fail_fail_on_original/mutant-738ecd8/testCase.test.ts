import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should resolve with the joined value if the two promises resolve to the same value in the original code, but fail in the mutated code", () => {
        return Q.join(Q(1), Q(1)).then(
            (value) => {
                expect(value).toBe(1);
            },
            (error) => {
                throw new Error("Expected Q.join to resolve in the original code");
            }
        );
    });
});