import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should track unhandled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("Test error"));
        expect(promise.isRejected()).toBe(true);
    });
});