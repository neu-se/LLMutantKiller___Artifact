import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
    it("should include internal frames in stack traces when mutation is present", async () => {
        // Create a scenario that generates a stack trace with internal frames
        const error = new Error("Test error");
        const promise = Q.reject(error);

        try {
            await promise;
        } catch (e: any) {
            // The stack should contain internal Q frames when mutation is present
            const stack = e.stack;
            // Check that internal frames are included (mutation behavior)
            expect(stack).toContain("q.js");
        }
    });
});