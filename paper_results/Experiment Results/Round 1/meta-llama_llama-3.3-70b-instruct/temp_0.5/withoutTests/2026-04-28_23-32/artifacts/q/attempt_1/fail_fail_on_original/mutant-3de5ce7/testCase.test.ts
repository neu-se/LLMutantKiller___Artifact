import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse stack line with line number', () => {
        var error = new Error();
        error.stack = "Error\n    at test (@:10:11)";
        var stackLines = error.stack.split("\n");
        var line = stackLines[1];
        var fileNameAndLineNumber = getFileNameAndLineNumber(line);
        expect(fileNameAndLineNumber).toEqual(['', 10]);
    });
});