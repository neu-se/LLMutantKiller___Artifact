import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not track unhandled rejections when Q.stopUnhandledRejectionTracking is called", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});