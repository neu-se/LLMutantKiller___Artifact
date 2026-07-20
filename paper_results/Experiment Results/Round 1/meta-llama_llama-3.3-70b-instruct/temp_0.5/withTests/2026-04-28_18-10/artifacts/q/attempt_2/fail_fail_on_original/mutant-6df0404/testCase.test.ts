import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
        Q.stopUnhandledRejectionTracking();
        Q.reject("Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});