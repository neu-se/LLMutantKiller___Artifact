import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should reject the promise when an error is thrown in the resolver", () => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            try {
                throw new Error("Test error");
            } catch (error: any) {
                reject(error);
            }
        });

        return promise.then((value: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});