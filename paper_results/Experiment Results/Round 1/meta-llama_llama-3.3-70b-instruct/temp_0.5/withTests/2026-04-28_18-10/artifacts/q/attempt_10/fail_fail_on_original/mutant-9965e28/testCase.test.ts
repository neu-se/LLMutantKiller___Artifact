import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle rejection tracking correctly", () => {
        var reason = new Error("Test error");
        var promise = q.reject(reason);
        q.resetUnhandledRejections();
        var unhandledReasons = q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        if (reason.stack) {
            expect(unhandledReasons[0]).toContain(reason.stack);
        } else {
            expect(unhandledReasons[0]).toBe("(no stack) " + reason);
        }
        promise.catch(() => {});
        unhandledReasons = q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(0);
    });
});