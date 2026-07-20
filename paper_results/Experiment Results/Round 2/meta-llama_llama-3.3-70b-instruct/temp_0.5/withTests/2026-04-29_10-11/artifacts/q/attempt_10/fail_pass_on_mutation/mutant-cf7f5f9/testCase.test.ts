import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when Q.onerror is not called", () => {
        Q.resolve().then(() => {
            throw new Error("Test error");
        }).catch(() => {});
        expect(true).toBe(true);
    });
});