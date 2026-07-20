import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call Q.onerror when an error occurs in a promise chain", () => {
        let errorCalled = false;
        Q.onerror = (error: any) => {
            errorCalled = true;
        };

        Q().then(() => {
            throw new Error("Test error");
        }).done();

        // Add a small delay to ensure the error has been processed
        setTimeout(() => {
            expect(errorCalled).toBe(true);
        }, 10);
    });
});