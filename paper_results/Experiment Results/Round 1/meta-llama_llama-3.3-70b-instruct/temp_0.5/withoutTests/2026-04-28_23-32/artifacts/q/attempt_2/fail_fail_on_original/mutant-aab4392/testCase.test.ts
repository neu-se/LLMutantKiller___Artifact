import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack trace filtering correctly', () => {
        const error = new Error();
        const stack = "Error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:1:1)";
        error.stack = stack;
        const filteredStackLines = Q.filterStackString(stack).split("\n");
        expect(filteredStackLines.length).toBeLessThan(stack.split("\n").length);
    });
});