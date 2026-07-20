import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", () => {
        let progressCalled = false;
        let thenCalled = false;
        Q.delay(10).progress(() => {
            progressCalled = true;
            throw new Error("Test error");
        }).then(() => {
            thenCalled = true;
        });
        // If the mutation is present, then will be called
        // If the original code is used, then will not be called
        expect(progressCalled).toBe(true);
        expect(thenCalled).toBe(false);
    });
});