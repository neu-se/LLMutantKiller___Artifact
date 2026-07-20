import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack ? stack.split("\n") : [];
        const isInternalFrame = (line: string) => {
            // This is a simplified version of Q.isInternalFrame
            return line.includes("(module.js:") || line.includes("(node.js:");
        };
        const filteredLines = lines.filter(line => !isInternalFrame(line));
        expect(filteredLines.length).toBeLessThan(lines.length);
    });
});