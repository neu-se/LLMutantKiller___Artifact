import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a toString method that returns a string of length greater than 0", () => {
        const promise = Q.resolve();
        expect(promise.toString().length).toBeGreaterThan(0);
    });
});