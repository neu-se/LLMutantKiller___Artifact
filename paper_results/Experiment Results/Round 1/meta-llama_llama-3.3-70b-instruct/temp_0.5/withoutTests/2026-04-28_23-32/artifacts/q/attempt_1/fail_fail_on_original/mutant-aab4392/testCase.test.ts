import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack trace filtering correctly', () => {
        const error = new Error();
        error.stack = "Error\n    at test (/path/to/test.js:1:1)\n    at Module._compile (module.js:1:1)";
        const filteredStack = Q.filterStackString(error.stack);
        expect(filteredStack).not.toContain("at Module._compile");
    });
});