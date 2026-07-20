import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an exception is thrown in the promise dispatch", () => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            throw new Error("Test error");
        });
        return promise.then(() => {
            throw new Error("Expected promise to be rejected");
        }, (error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});