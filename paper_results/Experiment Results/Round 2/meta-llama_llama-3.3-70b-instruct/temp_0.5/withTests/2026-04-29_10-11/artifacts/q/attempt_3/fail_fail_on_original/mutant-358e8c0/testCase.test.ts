import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should return a promise that is not always fulfilled", () => {
        const promise = Q(true);
        expect(promise.isFulfilled()).toBe(true);
        const promise2 = Q.reject(new Error());
        expect(promise2.isFulfilled()).toBe(false);
    });
});