import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the 'valueOf' method for a rejected promise", () => {
        const promise = Q.reject("Test rejection reason");
        expect(promise.valueOf()).toBe(promise);
    });
});