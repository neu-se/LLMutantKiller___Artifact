// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise constructor validation", () => {
    it("should accept a function resolver and create a promise", () => {
        // This test will pass in the original code (accepts function resolver)
        // but fail in the mutated code (always rejects due to `if (true)`)
        return Q.Promise((resolve: any) => {
            resolve("success");
        }).then((result: any) => {
            expect(result).toBe("success");
        });
    });
});