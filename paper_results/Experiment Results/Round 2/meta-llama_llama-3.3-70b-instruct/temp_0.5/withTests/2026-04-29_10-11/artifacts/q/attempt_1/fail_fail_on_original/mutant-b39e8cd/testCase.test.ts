import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should detect if a promise is rejected", () => {
        const promise = Q.reject(new Error("Test error"));
        expect(promise.isRejected()).toBe(true);
    });
});