import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the 'valueOf' method for a fulfilled promise", () => {
        const promise = Q(5);
        expect(promise.valueOf()).toBe(5);
    });

    it("should correctly handle the 'valueOf' method for a rejected promise", () => {
        const promise = Q.reject("Test rejection reason");
        expect(() => promise.valueOf()).toThrow();
    });
});