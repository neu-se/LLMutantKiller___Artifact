import { Q } from "../../../q.js";

describe("Q", () => {
    it("should reset unhandled rejections", () => {
        Q.reject("Test rejection");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});