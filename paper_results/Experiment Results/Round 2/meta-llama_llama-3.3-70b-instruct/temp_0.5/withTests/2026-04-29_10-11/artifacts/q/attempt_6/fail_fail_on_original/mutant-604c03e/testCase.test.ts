import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should track and untrack rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");
        deferred.reject(rejectionReason);

        const at = Q.unhandledRejections.indexOf(promise);
        expect(at).not.toBe(-1);

        Q.untrackRejection(promise);

        const newAt = Q.unhandledRejections.indexOf(promise);
        expect(newAt).toBe(-1);
    });
});