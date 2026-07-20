import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test"]);
    });

    it("should not track handled rejections", () => {
        Q.resetUnhandledRejections();
        Q.reject("test").catch(() => {});
        expect(Q.getUnhandledReasons()).toEqual([]);
    });

    it("should stop tracking after calling stopUnhandledRejectionTracking", () => {
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});