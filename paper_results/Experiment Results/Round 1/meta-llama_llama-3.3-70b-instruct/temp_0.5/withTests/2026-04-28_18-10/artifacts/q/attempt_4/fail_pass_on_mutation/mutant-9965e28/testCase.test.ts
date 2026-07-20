import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle rejection tracking correctly", () => {
        var reason = new Error("Test error");
        reason.stack = undefined;
        var promise = q.reject(reason);
        q.resetUnhandledRejections();
        promise.catch(() => {});
        var unhandledReasons = q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(0);
    });
});