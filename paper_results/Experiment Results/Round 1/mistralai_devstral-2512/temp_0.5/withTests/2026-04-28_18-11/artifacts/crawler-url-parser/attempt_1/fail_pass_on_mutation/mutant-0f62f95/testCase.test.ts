// test/mutant-test.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent check', () => {
  it('should not execute the test block when module is not the main module', () => {
    // This test will pass in the original code because the test block is skipped when module.parent is truthy
    // In the mutated code, the condition is inverted, so the test block will execute and fail
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/");
  });
});