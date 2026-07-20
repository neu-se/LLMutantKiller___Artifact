import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify a Node.js frame in a stack trace', () => {
        const error = new Error();
        error.stack = `(module.js:1:1)`;
        const isNodeFrame = (stackLine: string) => stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        expect(isNodeFrame(error.stack)).toBe(true);
    });
});