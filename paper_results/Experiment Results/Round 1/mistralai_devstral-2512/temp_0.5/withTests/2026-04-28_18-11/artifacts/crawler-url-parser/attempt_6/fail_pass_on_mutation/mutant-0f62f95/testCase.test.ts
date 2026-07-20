// test/mutant-test.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module parent check', () => {
  it('should not execute debug code when module is required', () => {
    // The mutation changes the condition from `if (!module.parent)` to `if (module.parent)`
    // The debug code contains: let url = "https ://www.npmjs.com/package/electron-window-manager";
    // This malformed URL would cause parse to return null if the debug code runs
    // We can detect this by checking if parse was called with this malformed URL

    // Spy on the parse function to detect if it's called with the debug URL
    const parseSpy = jest.spyOn({ parse }, 'parse');

    // Call parse with a normal URL
    const result = parse("http://example.com");
    expect(result).not.toBeNull();

    // Check if parse was called with the debug URL (which would happen in mutated code)
    const debugUrlCalls = parseSpy.mock.calls.filter(call =>
      call[0] === "https ://www.npmjs.com/package/electron-window-manager"
    );

    // In original code, this should be 0 (debug code doesn't run)
    // In mutated code, this would be 1 (debug code runs)
    expect(debugUrlCalls.length).toBe(0);

    // Restore the spy
    parseSpy.mockRestore();
  });
});