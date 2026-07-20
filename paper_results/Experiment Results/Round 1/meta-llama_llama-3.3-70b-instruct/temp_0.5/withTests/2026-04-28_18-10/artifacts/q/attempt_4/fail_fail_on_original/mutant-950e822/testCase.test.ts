import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.toString", () => {
    it("should return '[object Promise]' when called on a promise", () => {
        const promise = Q(10);
        expect(Object.prototype.toString.call(promise)).toBe("[object Promise]");
    });
});