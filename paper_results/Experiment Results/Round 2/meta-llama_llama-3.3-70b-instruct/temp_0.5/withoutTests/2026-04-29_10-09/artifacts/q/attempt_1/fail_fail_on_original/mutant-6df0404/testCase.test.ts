import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
        Q.stopUnhandledRejectionTracking();
        expect(Q.stopUnhandledRejectionTracking).toThrowError("Q.noConflict only works when Q is used as a global");
    });
});