import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should report unhandled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");
        deferred.reject(rejectionReason);

        expect(Q.getUnhandledReasons()).toEqual([rejectionReason.stack]);
    });

    it("should not report handled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Handled rejection");
        deferred.reject(rejectionReason);

        promise.catch(() => {});

        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});