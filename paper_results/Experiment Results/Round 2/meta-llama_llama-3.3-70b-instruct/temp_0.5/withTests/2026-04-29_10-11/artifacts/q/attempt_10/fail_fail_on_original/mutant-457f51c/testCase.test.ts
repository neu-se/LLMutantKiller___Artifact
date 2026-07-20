import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have an exception property for a rejected promise", () => {
        const promise = Q.reject("reason");
        expect(promise.exception).toBe("reason");
    });
});