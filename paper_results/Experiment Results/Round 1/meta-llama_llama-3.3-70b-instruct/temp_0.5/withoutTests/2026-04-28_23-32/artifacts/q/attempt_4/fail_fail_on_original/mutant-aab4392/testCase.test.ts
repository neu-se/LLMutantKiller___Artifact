import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack trace filtering correctly', () => {
        const lines = [
            "Error",
            "    at test (/path/to/test.js:1:1)",
            "    at Module._compile (module.js:1:1)",
            "    at Module._compile (module.js:2:1)",
            "    at Module._compile (module.js:3:1)",
        ];
        const stack = lines.join("\n");
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toContain("Module._compile (module.js:3:1)");
    });
});