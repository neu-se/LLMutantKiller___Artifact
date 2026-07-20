import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber for Firefox style stack lines', () => {
        const error = new Error();
        error.stack = "function@filename:lineNumber";
        const stackLine = error.stack.split("\n")[0];
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            const result = [attempt3[1], Number(attempt3[2])];
            expect(result).toEqual(["filename", NaN]);
        } else {
            expect(true).toBe(false);
        }
    });
});