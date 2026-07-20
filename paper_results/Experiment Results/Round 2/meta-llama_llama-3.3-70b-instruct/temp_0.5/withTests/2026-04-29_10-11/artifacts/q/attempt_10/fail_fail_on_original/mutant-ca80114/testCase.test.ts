import { Q } from "../../../q.js";

describe("Q", () => {
    it("should handle uncaught exceptions in NodeJS environment", () => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            reject(new Error("Test error"));
        });

        promise.catch((error: Error) => {
            expect(error.message).toBe("Test error");
        });
    });
});