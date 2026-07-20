import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections after calling Q.resetUnhandledRejections", () => {
        Q.resetUnhandledRejections();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });
});