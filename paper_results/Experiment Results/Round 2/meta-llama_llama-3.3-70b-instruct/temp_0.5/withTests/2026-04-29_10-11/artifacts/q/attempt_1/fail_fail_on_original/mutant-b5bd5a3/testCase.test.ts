import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a working inspect method for fulfilled promises", () => {
        const promise = Q(10);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(10);
    });
});