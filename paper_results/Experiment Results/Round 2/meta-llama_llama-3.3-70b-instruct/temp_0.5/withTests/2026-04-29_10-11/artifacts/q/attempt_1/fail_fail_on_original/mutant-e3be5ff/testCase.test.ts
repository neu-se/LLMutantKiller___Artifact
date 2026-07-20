import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.resetUnhandledRejections();
        Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) test"]);
        Q.stopUnhandledRejectionTracking();
        Q.reject("test2");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});