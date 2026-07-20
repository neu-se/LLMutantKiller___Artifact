import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const error = new Error();
        const stackTrace = error.stack;
        if (stackTrace) {
            const lines = stackTrace.split("\n");
            if (lines.length > 0) {
                const stackLine = lines[0];
                const isNodeFrame = stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
                expect(isNodeFrame).toBeTruthy();
            }
        }
    });
});