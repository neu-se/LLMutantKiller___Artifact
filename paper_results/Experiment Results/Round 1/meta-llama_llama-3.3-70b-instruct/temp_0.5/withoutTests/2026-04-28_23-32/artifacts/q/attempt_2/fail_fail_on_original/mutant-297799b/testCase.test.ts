import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter out Node.js frames from stack traces", () => {
        const error = new Error("Test error");
        error.stack = "Error: Test error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)";
        const lines = error.stack.split("\n");
        const filteredLines = lines.filter(line => !isNodeFrame(line));
        expect(filteredLines.length).toBe(1);
    });
});

function isNodeFrame(stackLine: string): boolean {
    return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
}