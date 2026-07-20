import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = Q.defer().promise;
        Q.trackRejection(promise, "test");
        expect(Q.getUnhandledReasons().length).toBe(1);
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});