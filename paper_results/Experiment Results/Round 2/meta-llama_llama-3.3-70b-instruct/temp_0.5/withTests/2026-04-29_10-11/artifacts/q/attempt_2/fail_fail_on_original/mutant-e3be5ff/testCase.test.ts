import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        Q.trackRejection(deferred.promise, "test");
        expect(Q.unhandledRejections.length).toBe(1);
        Q.untrackRejection(deferred.promise);
        expect(Q.unhandledRejections.length).toBe(0);
    });
});