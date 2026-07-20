import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should reject a promise with a stack trace", () => {
        const promise = Q.reject(new Error("Test error"));
        return promise.catch((error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});