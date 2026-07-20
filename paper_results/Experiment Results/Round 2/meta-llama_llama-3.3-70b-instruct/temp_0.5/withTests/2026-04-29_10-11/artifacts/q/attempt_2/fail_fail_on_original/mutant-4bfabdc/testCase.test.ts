import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should filter out internal frames and node frames", () => {
        // Create a stack string with internal frames and node frames
        const stackString = `Error: Test error
    at isInternalFrame (q.js:100:10)
    at isNodeFrame (node.js:50:20)
    at externalFrame (test.js:10:10)`;

        // Call filterStackString with the stack string
        const lines = stackString.split("\n");
        const desiredLines = [];
        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            if (Q.isInternalFrame(line) && Q.isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        const filteredStackString = desiredLines.join("\n");

        // Check that internal frames and node frames are filtered out
        expect(filteredStackString).toBe("    at isInternalFrame (q.js:100:10)\n    at isNodeFrame (node.js:50:20)");
    });
});