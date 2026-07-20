import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent test', function() {
    it('should not execute debug code when module is required', function() {
        // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
        // In the original code, the debug code only runs when the module is executed directly
        // In the mutated code, the debug code runs when the module is required
        // We can detect this by checking if parse() throws an error due to the debugger statement

        // First verify the function exists
        expect(typeof parse).toBe('function');

        // Then try to use it - if debug code runs, it will hit debugger and fail
        const result = parse("http://example.com");
        expect(result).not.toBeNull();
        expect(result.url).toBe("http://example.com/");
    });
});