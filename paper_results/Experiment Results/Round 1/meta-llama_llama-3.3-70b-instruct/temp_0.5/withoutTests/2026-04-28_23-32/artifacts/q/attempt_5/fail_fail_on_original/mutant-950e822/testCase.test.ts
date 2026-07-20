import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a toString method that does not return an empty string", () => {
        const promise = Q.resolve();
        expect(promise.toString()).not.toBe("");
    });
});