import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a toString method that returns [object Promise]", () => {
        const promise = Q.resolve();
        expect(promise.toString()).toBe("[object Promise]");
    });
});