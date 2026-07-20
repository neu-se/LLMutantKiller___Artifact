import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should reset unhandled rejections", () => {
        Q.reject("Test rejection");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});