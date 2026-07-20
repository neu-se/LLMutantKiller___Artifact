import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reset unhandled rejections", () => {
        Q.reject("Test rejection");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.resetUnhandledRejections();
        expect(trackUnhandledRejections).toBe(true);
    });
});