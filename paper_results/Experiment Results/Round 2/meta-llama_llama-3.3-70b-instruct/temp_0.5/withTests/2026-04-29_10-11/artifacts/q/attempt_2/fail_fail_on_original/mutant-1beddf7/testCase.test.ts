import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an error is thrown in the resolver", () => {
        const promise = Q((resolve, reject) => {
            try {
                throw new Error("Test error");
            } catch (error) {
                reject(error);
            }
        });

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Test error");
        });
    });
});