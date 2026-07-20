import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const isInternalFrame = (stackLine: string) => {
            return stackLine.indexOf("(node.js:") !== -1;
        };

        const result = stackLines.some(isInternalFrame);
        expect(result).toBeTruthy();
    });
});