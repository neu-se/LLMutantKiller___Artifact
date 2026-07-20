import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.stopUnhandledRejectionTracking", () => {
    it("should stop tracking unhandled rejections when trackUnhandledRejections is set to true", () => {
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });

    it("should not stop tracking unhandled rejections when trackUnhandledRejections is set to false", () => {
        Q.resetUnhandledRejections();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });
});