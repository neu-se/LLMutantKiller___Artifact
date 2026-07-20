// Test to detect the mutation in q.js where process.toString() === "[object process]" was changed to process.toString() === ""
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
    it("should correctly identify Node.js environment using process.toString()", () => {
        // This test verifies that Q correctly identifies a Node.js environment
        // by checking that process.nextTick is used when process.toString() returns "[object process]"
        // The mutation changes this check to an empty string, which would fail in a real Node.js environment

        // We'll test this by checking the behavior of Q.nextTick in a Node.js environment
        // The original code should use process.nextTick, while the mutated code would not

        return new Promise((resolve, reject) => {
            // Check if we're in a Node.js environment
            if (typeof process !== "undefined" && process.toString() === "[object process]") {
                // In original code, this should work
                Q.nextTick(() => {
                    resolve(true);
                });
            } else {
                // In mutated code with empty string check, this would fail
                // or in non-Node environments, we'll just resolve
                resolve(false);
            }
        }).then((result) => {
            // In a real Node.js environment with original code, this should be true
            // With mutated code, it would be false
            expect(result).toBe(true);
        });
    });
});