import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave as expected", () => {
        const promise = Q.defer();
        promise.resolve();
        expect(promise.promise.isFulfilled()).toBe(true);
    });
});