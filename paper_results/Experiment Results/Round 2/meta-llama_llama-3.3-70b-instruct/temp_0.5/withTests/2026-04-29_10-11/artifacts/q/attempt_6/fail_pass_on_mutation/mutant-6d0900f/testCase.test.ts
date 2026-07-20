import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should not track rejection when trackUnhandledRejections is false", () => {
        q.stopUnhandledRejectionTracking();
        q.reject("reason");
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});