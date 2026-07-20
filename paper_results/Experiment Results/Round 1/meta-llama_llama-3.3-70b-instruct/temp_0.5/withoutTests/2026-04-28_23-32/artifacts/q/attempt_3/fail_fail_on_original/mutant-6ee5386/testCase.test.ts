import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", () => {
        let errorThrown = false;
        let progressCalled = false;
        Q.delay(10).progress(() => {
            progressCalled = true;
            throw new Error("Test error");
        }).catch((error: any) => {
            errorThrown = true;
        });
        expect(progressCalled).toBe(true);
        expect(errorThrown).toBe(false); // This should be false for the original code and true for the mutated code
    });
});