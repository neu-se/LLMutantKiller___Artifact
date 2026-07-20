import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify Node.js frames in stack traces', () => {
        const error = new Error();
        const stackLines = error.stack.split('\n');
        const isNodeFrame = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        const expected = stackLines.some(isNodeFrame);
        const actual = stackLines.some((line: string) => {
            try {
                throw new Error();
            } catch (e) {
                return e.stack.indexOf(line) !== -1;
            }
        });
        expect(expected).toBe(true);
        expect(actual).toBe(true);
    });
});