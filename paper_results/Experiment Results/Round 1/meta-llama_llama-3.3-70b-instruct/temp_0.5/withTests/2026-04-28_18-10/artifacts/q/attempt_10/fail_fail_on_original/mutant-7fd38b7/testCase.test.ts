import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});