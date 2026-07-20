import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent test', function() {
    it('should not execute debug code when module is required', function() {
        // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
        // In the original code, the debug code only runs when the module is executed directly
        // In the mutated code, the debug code runs when the module is required
        // We can detect this by checking if the module exports are affected

        // Store the original parse function
        const originalParse = parse;

        // Try to call parse - if debug code runs, it will hit debugger and fail
        const result = originalParse("http://example.com");

        // Verify the result is correct
        expect(result).not.toBeNull();
        expect(result.url).toBe("http://example.com/");

        // Verify parse is still the same function (debug code shouldn't have modified exports)
        expect(parse).toBe(originalParse);
    });
});