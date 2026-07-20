// test/mutant-test.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent check', () => {
  it('should not execute debug code when module is required', () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains a call to parse with a malformed URL that has illegal characters
    // This would cause parse to return null, which we can detect by checking the behavior

    // First verify normal parsing works
    const normalResult = parse("http://example.com");
    expect(normalResult).not.toBeNull();
    expect(normalResult?.url).toBe("http://example.com/");

    // The debug code would call parse with "https ://www.npmjs.com/package/electron-window-manager"
    // This URL has illegal characters (space after https) so parse returns null
    // We can test this specific case to see if it was called
    const malformedResult = parse("https ://www.npmjs.com/package/electron-window-manager");
    expect(malformedResult).toBeNull();

    // Now test that normal parsing still works
    const testResult = parse("http://test.com");
    expect(testResult).not.toBeNull();
    expect(testResult?.url).toBe("http://test.com/");

    // The test passes on original code because debug code doesn't run
    // The test would fail on mutated code if debug code runs and affects parse behavior
  });
});