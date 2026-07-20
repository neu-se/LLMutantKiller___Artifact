// test/mutant-test.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent check', () => {
  it('should not execute debug code when module is required', () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains a call to parse with a malformed URL that has illegal characters
    // This would cause parse to return null, which we can detect by checking the call count

    // Get initial call count
    const initialCalls = (parse as jest.Mock).mock.calls?.length || 0;

    // Call parse with a normal URL
    const result = parse("http://example.com");
    expect(result).not.toBeNull();

    // Get current call count
    const currentCalls = (parse as jest.Mock).mock.calls?.length || 0;

    // In original code, the difference should be 1 (only our test call)
    // In mutated code, the difference would be 2 (our test call + debug code call)
    expect(currentCalls - initialCalls).toBe(1);
  });
});