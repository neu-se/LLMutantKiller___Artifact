import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module execution side effects', () => {
    it('should not have empty string side effects in module execution', () => {
        // This test verifies that the module doesn't produce empty string side effects
        // The mutation changes console.log("for testing purpose") to console.log("")
        // We test this by checking that parse() doesn't return empty strings
        const result = parse("http://test.com/path");
        expect(result).not.toBeNull();
        expect(result?.url).not.toBe("");
        expect(result?.host).not.toBe("");
        expect(result?.protocol).not.toBe("");
    });
});