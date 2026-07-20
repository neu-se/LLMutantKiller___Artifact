import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a correct toString method", () => {
        const promise = Q.resolve();
        expect(promise.toString()).toBe("[object Promise]");
    });
});