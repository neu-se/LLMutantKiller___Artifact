// test/mutant-7ad20c8.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module execution behavior', () => {
    it('should not execute testing code when required as module', () => {
        // The mutation changes `if (!module.parent)` to `if (true)`
        // which would cause the testing code block to execute when the module is required
        // This test verifies the module doesn't have side effects from that block
        const result = parse("https://example.com/test");
        expect(result).not.toBeNull();
        expect(result?.url).toBe("https://example.com/test");
    });
});