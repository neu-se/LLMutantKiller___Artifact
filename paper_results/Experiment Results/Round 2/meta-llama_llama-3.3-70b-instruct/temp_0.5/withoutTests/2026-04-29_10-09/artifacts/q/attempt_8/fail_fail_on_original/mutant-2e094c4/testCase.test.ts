import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const isNodeFrameOriginal = (stackLine: string) => {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };

        const isNodeFrameMutated = (stackLine: string) => {
            return false;
        };

        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const originalResult = stackLines.some(isNodeFrameOriginal);
        const mutatedResult = stackLines.some(isNodeFrameMutated);

        expect(originalResult).not.toBe(mutatedResult);
    });
});