import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames and node frames", () => {
        // Create a stack string with internal frames and node frames
        const stackString = `Error: Test error
    at internalFrame (q.js:100:10)
    at nodeFrame (node.js:50:20)
    at externalFrame (test.js:10:10)`;

        // Call filterStackString with the stack string
        const filteredStackString = Q.filterStackString(stackString);

        // Check that internal frames and node frames are filtered out
        expect(filteredStackString).toBe("Error: Test error\n    at externalFrame (test.js:10:10)");
    });
});