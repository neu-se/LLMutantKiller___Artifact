import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const error = new Error();
        const stackTrace = error.stack;
        if (stackTrace) {
            const lines = stackTrace.split("\n");
            if (lines.length > 0) {
                const stackLine = lines[0];
                const isInternalFrame = Q.isInternalFrame(stackLine);
                expect(isInternalFrame).not.toBe(false);
            }
        }
    });
});