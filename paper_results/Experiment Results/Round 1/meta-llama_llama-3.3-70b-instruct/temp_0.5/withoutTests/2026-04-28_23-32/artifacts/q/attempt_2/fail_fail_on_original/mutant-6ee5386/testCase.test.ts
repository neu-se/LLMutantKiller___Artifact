import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", () => {
        let errorThrown = false;
        Q.delay(10).progress(() => {
            throw new Error("Test error");
        }).catch((error) => {
            errorThrown = true;
        });
        // If the mutation is present, the error will not be caught and the test will fail
        // If the original code is used, the error will be caught and the test will pass
        expect(errorThrown).toBe(true);
    });
});