import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should filter out internal frames from stack traces correctly", () => {
        // Create a new error to test the filtering of internal frames
        const error = new Error();
        const stack = error.stack;

        // Define a function to test the filtering
        function testFunction() {
            throw error;
        }

        // Call the test function to get the stack trace
        try {
            testFunction();
        } catch (e) {
            const filteredStack = Q.filterStackString(e.stack);

            // Check if the internal frames are filtered out correctly
            expect(filteredStack).not.toContain("testFunction");
            expect(filteredStack).not.toContain("q.js");
        }
    });
});