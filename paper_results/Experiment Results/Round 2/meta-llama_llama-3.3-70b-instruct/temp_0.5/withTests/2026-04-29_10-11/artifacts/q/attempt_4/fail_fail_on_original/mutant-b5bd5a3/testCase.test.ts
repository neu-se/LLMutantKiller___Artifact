import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle promise rejection with error", () => {
        const promise = Q.reject(new Error("Test Error"));
        expect(promise.isRejected()).toBe(true);
    });
});