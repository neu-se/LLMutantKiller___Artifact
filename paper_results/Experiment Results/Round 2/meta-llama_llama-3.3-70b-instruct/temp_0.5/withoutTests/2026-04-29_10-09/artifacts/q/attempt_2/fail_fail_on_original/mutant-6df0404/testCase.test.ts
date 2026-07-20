import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
        expect(Q.stopUnhandledRejectionTracking).not.toThrow();
        Q.stopUnhandledRejectionTracking();
        expect(Q.trackUnhandledRejections).toBe(false);
    });
});