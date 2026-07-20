import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const originalIsNodeFrame = Q.isNodeFrame;
        Q.isNodeFrame = function(stackLine) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };

        const error = new Error();
        const stackTrace = error.stack;
        const lines = stackTrace.split("\n");
        const isNodeFrame = Q.isNodeFrame(lines[0]);

        expect(isNodeFrame).toBeTruthy();

        Q.isNodeFrame = originalIsNodeFrame;
    });
});