import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should resolve with the joined value if the two promises resolve to the same value", () => {
        return Q.join(Q(1), Q(1)).then(
            (value) => {
                expect(value).toBe(1);
            }
        ).catch((error) => {
            throw new Error("Expected Q.join to resolve");
        });
    });
});