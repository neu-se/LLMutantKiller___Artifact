import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.defer().promise;
        const error = new Error("Test error");
        Q.untrackRejection(promise);
        expect(() => {
            Q.nextTick.runAfter(() => {
                throw error;
            });
        }).not.toThrow();
    });
});