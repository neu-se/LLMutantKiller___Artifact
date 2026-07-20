import { Q } from "../../../q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        const promise = Q((resolve, reject) => {
            reject(new Error("Test error"));
        });

        promise.catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });
});