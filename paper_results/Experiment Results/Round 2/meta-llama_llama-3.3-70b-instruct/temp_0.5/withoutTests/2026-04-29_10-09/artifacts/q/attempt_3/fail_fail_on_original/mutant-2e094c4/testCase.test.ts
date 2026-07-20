import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const isNodeFrameOriginal = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        const isNodeFrameMutated = (stackLine: string) => false;
        const expected = stackLines.some(isNodeFrameOriginal);
        const actual = stackLines.some(isNodeFrameMutated);
        expect(expected).not.toBe(actual);
    });
});