import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const unhandledRejections = Q.getUnhandledReasons();
        expect(unhandledRejections.length).toBe(0);

        Q.reject("Test error");

        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});