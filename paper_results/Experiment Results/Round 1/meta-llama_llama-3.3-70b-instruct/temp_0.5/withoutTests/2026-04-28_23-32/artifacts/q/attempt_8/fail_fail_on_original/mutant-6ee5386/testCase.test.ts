import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress callback exceptions correctly", () => {
        let threw = false;
        Q.delay(10).progress(() => {
            threw = true;
            throw new Error("Test error");
        }).catch((error: any) => {
            threw = false;
        });
        expect(threw).toBe(true); // This should be true for the original code and false for the mutated code
    });
});