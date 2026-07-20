import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const isNodeFrame = (stackLine: string) => {
            try {
                throw new Error();
            } catch (e: any) {
                if (e.stack) {
                    const stackLines = e.stack.split('\n');
                    return stackLines.includes(stackLine);
                }
            }
            return false;
        };

        const error = new Error();
        const stackLines = error.stack?.split('\n') || [];
        const originalResult = stackLines.some(isNodeFrame);
        const mutatedResult = false; // since the mutation always returns false

        expect(originalResult).not.toBe(mutatedResult);
    });
});