import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a correct toString method", () => {
        const promise = Q.resolve();
        expect(Object.prototype.toString.call(promise)).toBe("[object Object]");
    });
});