import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should reject promise with error when uncaught exception occurs in non-Node environment", (done) => {
        // Create a promise that throws an error
        const promise = Q((resolve: any, reject: any) => {
            throw new Error("Test error");
        });

        // Catch the error and check if it's the same as the original error
        promise.catch((error: any) => {
            expect(error.message).toBe("Test error");
            done();
        });
    });
});