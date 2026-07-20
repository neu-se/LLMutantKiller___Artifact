import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        Q.resetUnhandledRejections();
        var reason = "test reason";
        Q.reject(reason);
        expect(Q.getUnhandledReasons()).toEqual([`(no stack) ${reason}`]);
        if (Q.trackUnhandledRejections) {
            Q.stopUnhandledRejectionTracking();
        }
        Q.reject("test reason 2");
        expect(Q.getUnhandledReasons()).toEqual([`(no stack) ${reason}`]);
    });
});