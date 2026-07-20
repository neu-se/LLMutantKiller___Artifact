import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly identify a Node.js frame in a stack trace', () => {
        const error = new Error();
        error.stack = `(node:internal/process/promises:241:5)`;
        expect(isNodeFrame(error.stack)).toBe(true);
    });
});