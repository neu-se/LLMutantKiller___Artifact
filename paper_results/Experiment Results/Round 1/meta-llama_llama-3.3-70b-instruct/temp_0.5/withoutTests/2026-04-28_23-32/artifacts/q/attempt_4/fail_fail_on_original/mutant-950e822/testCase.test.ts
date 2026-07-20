import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a toString method that returns a string", () => {
        const promise = Q.resolve();
        expect(typeof promise.toString()).toBe("string");
    });
});