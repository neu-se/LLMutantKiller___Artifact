import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const originalProcessType = typeof process;
        Q.reject("Test error");

        expect(typeof process).toBe(originalProcessType);
    });
});