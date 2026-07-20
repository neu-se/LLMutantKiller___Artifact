import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a promise for x and y if they are the same, and reject if they are different", () => {
        const x = "test";
        const y = "test";
        const promise = Q(x).join(y);
        expect(promise).resolves.toBe(x);

        const z = "different";
        const promise2 = Q(x).join(z);
        expect(promise2).rejects.toThrowError("Q can't join: not the same: test different");
    });
});