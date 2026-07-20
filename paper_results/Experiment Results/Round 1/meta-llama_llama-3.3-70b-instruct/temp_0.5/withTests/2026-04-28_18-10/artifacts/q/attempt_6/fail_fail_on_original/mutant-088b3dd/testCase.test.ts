import { Q } from "../q.js";

describe("Q", () => {
    it("should reject a promise with a stack trace", () => {
        const promise = Q.reject(new Error());
        return promise.catch((error: any) => {
            expect(error.stack).not.toBeNull();
        });
    });
});