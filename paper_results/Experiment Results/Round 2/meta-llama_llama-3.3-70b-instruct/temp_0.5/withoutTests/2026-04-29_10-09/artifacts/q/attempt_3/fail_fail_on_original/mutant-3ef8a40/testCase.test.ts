import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should reject if x and y are different", () => {
        const x = "test";
        const y = "different";
        const promise = Q.join(x, y);
        expect(promise).rejects.toThrowError("Q can't join: not the same: test different");
    });
});