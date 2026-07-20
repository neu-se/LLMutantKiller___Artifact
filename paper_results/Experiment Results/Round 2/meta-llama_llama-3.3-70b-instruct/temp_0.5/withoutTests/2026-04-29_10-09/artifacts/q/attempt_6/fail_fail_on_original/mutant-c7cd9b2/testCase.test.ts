import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse stack lines', () => {
        try {
            throw new Error();
        } catch (e) {
            const stackLines = e.stack.split('\n');
            const stackLine = stackLines[1];
            const result = getFileNameAndLineNumber(stackLine);
            expect(result).toBeTruthy();
        }
    });
});

function getFileNameAndLineNumber(stackLine) {
    var attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }
}