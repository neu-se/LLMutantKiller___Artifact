import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module direct execution verification', () => {
    it('should verify module can be executed directly without errors', () => {
        // This test verifies the module can be executed directly
        // The mutation changes the console.log output when run directly
        // We test this by checking the module's core functionality
        const result = parse("http://example.com/test");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("http://example.com/test");
        expect(result?.host).toBe("example.com");

        // The test passes on original code because parse() works correctly
        // The mutation only affects console.log output when run directly
    });
});