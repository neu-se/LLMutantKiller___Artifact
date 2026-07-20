import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        if (Q.trackUnhandledRejections) {
            var promise = Q.reject("test");
            expect(Q.getUnhandledReasons().length).toBe(1);
        } else {
            expect(false).toBe(true);
        }
    });
});