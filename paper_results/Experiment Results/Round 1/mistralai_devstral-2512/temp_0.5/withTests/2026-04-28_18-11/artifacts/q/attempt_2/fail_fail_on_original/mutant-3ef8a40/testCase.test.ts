import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
    it("should reject when x and y are equal", () => {
        const x = Q(5);
        const y = Q(5);
        return Q.join(x, y).then(() => {
            throw new Error("Expected promise to reject but it fulfilled");
        }, () => {
            // Expected behavior
        });
    });
});