import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse stack lines', () => {
        const error = new Error();
        error.stack = 'Error\n    at Object.<anonymous> (file.js:1:1)';
        const lines = error.stack.split('\n');
        const stackLine = lines[1];
        const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
        expect(attempt2).toBeTruthy();
    });
});