import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a working exception property for rejected promises", () => {
        const promise = Q.reject(new Error("Test Error"));
        expect(promise.exception).toBeInstanceOf(Error);
        expect(promise.exception.message).toBe("Test Error");
    });
});