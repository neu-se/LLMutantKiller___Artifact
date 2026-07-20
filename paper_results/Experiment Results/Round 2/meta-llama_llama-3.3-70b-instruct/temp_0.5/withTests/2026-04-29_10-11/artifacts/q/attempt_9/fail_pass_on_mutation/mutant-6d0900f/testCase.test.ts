import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should track rejection when trackUnhandledRejections is true and promise is rejected", () => {
        q.stopUnhandledRejectionTracking();
        q.resetUnhandledRejections();
        q.stopUnhandledRejectionTracking = function() {};
        q.trackUnhandledRejections = true;
        q.reject("reason");
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});