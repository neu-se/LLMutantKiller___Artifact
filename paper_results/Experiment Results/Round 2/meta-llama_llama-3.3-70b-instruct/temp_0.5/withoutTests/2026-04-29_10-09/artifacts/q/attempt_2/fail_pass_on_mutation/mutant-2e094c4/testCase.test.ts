import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const isNodeFrame = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        const expected = stackLines.some(isNodeFrame);
        const actual = isNodeFrame(stackLines[0]);
        expect(expected).toBe(actual);
    });
});