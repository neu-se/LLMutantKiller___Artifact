import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        var promise = Q.reject("test");
        expect(Q.getUnhandledReasons().length).toBe(1);
        Q.stopUnhandledRejectionTracking();
        promise.catch(() => {});
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.resetUnhandledRejections();
        var promise2 = Q.reject("test2");
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});