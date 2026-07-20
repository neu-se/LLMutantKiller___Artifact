import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a promise for x and y if they are the same", () => {
        const x = "test";
        const y = "test";
        const promise = Q(x).join(y);
        expect(promise).resolves.toBe(x);
    });

    it("should reject if x and y are different", () => {
        const x = "test";
        const y = "different";
        const promise = Q(x).join(y);
        expect(promise).rejects.toThrowError("Q can't join: not the same: test different");
    });
});