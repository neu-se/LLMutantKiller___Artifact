import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const isNodeFrameOriginal = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };

        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const originalResult = stackLines.some(isNodeFrameOriginal);

        expect(originalResult).toBeGreaterThan(false);
    });
});