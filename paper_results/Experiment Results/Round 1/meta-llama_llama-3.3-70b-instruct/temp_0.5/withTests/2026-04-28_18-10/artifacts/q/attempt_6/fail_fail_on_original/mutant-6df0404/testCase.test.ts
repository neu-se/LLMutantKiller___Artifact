import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not track unhandled rejections after calling Q.stopUnhandledRejectionTracking with trackUnhandledRejections set to false", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});