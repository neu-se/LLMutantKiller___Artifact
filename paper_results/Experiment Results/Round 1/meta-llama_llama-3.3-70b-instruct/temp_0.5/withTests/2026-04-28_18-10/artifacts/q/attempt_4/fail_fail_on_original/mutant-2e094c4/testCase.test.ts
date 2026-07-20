import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly identify Node.js frames in a stack trace", () => {
        const error = new Error();
        const stackTrace = error.stack;
        if (stackTrace) {
            const lines = stackTrace.split("\n");
            if (lines.length > 0) {
                const isNodeFrame = Q.isNodeFrame(lines[0]);
                expect(isNodeFrame).toBeTruthy();
            }
        }
    });
});