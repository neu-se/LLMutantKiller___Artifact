import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return a promise for x and y if they are the same", () => {
        const x = "test";
        const y = "test";
        const promise = Q.join(x, y);
        expect(promise).resolves.toBe(x);
    });
});