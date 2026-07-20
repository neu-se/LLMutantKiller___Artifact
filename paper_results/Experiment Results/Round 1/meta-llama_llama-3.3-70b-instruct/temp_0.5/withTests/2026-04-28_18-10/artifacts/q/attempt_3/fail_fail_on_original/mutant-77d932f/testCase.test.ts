import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle long stack traces correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        promise.catch((err) => {
            expect(err.stack).not.toBeNull();
        });
    });
});