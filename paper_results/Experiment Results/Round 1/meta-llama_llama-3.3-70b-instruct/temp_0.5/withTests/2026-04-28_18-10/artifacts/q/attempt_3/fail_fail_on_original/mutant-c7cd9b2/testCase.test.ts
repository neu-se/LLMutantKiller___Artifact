import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly parse the stack line', () => {
        const error = new Error();
        error.stack = "    at functionName (filename:lineNumber:columnNumber)";
        const result = Q.isInternalFrame(error.stack);
        expect(result).toBe(false);
    });
});