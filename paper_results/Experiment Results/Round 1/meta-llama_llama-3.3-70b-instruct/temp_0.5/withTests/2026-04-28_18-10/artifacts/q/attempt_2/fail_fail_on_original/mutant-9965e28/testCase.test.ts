import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle rejection tracking correctly", () => {
        var reason = new Error("Test error");
        var promise = Q.reject(reason);
        Q.resetUnhandledRejections();
        var unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(1);
        promise.catch(() => {});
        unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons.length).toBe(0);
    });
});