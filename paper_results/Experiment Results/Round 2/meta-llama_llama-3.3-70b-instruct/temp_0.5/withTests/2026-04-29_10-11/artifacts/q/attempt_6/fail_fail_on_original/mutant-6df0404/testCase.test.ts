import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
    it("should stop tracking unhandled rejections", () => {
        Q.resetUnhandledRejections();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        Q.stopUnhandledRejectionTracking();
        Q.reject("Another test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection", "(no stack) Another test rejection"]);
    });
});