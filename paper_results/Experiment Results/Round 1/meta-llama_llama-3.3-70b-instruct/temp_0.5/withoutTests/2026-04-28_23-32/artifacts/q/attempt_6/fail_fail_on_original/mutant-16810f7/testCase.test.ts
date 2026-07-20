import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle process object correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        Q.untrackRejection(promise);
        expect(Q.getUnhandledReasons().length).toBeLessThan(1);
    });
});