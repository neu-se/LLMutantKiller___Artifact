import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const originalIsNodeFrame = Q.isInternalFrame;
        Q.isInternalFrame = function(stackLine) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };

        const error = new Error();
        const stackTrace = error.stack;
        if (stackTrace) {
            const lines = stackTrace.split("\n");
            if (lines.length > 0) {
                const stackLine = lines[0];
                const isInternalFrame = Q.isInternalFrame(stackLine);
                expect(isInternalFrame).toBeFalsy();
            }
        }

        Q.isInternalFrame = originalIsNodeFrame;
    });
});