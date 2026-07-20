import { Q } from "./q.js";

describe("Q Promise", () => {
    it("should reject the promise when an error is thrown in the resolver", () => {
        let called = false;
        const promise = Q((resolve, reject) => {
            called = true;
            reject(new Error("Test error"));
        });

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Test error");
            expect(called).toBe(true);
        });
    });
});