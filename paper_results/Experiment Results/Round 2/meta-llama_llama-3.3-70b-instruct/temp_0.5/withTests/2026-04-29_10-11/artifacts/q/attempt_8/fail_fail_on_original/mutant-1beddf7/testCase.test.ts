import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an error is thrown in the resolver", () => {
        let rejectCalled = false;
        const promise = Q((resolve, reject) => {
            reject(new Error("Test error"));
            rejectCalled = true;
        });

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Test error");
            expect(rejectCalled).toBe(true);
        });
    });
});