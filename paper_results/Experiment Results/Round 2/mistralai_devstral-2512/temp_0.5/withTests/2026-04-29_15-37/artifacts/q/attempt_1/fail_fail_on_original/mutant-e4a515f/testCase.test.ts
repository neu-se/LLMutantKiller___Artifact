// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise constructor validation", () => {
    it("should reject when resolver is not a function", () => {
        // This test will pass in the original code (resolver check works)
        // but fail in the mutated code (always rejects due to `if (true)`)
        return Q.Promise("not a function")
            .then(
                () => {
                    throw new Error("Promise should have been rejected");
                },
                (error) => {
                    expect(error).toBeInstanceOf(Error);
                    expect(error.message).toContain("resolver");
                }
            );
    });
});