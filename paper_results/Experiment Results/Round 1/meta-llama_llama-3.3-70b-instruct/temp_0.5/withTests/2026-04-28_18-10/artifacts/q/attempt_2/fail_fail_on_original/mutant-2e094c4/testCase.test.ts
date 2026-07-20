import { Q } from "../../../q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isNodeFrame = function(stackLine: string) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };

        const error = new Error();
        const stackTrace = error.stack;
        if (stackTrace) {
            const lines = stackTrace.split("\n");
            if (lines.length > 0) {
                const isNodeFrame = Q.isNodeFrame(lines[0]);
                expect(isNodeFrame).toBeTruthy();
            }
        }

        Q.isNodeFrame = originalIsNodeFrame;
    });
});