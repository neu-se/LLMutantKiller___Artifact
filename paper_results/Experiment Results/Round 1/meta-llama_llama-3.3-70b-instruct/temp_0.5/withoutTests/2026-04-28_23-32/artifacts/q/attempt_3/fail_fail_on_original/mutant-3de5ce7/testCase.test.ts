import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse stack line with line number', () => {
        var error = new Error();
        error.stack = "Error\n    at test (@:10:11)";
        var stackLines = error.stack.split("\n");
        var line = stackLines[1];
        var attempt3 = /.*@(.+):(\d+)$/.exec(line);
        if (attempt3 === null) {
            throw new Error("attempt3 is null");
        }
        expect(attempt3[2]).toBe('10');
    });
});