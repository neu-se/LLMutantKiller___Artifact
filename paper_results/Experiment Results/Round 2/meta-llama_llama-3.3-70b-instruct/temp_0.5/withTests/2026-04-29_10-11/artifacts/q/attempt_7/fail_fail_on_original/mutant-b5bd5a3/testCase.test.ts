import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should reject a promise when an error is thrown in the callback", () => {
        const promise = Q((resolve, reject) => {
            throw new Error("Test Error");
        });
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Test Error");
        });
    });
});