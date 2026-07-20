import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop tracking unhandled rejections after calling Q.stopUnhandledRejectionTracking", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});