import { execSync } from 'child_process';
import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly parse URLs and not log empty string', () => {
    const testUrl = 'http://example.com/path';
    const result = parse(testUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe('http://example.com/path');
    expect(result?.host).toBe('example.com');
    expect(result?.path).toBe('/path');

    // Verify the module doesn't log empty string when imported
    // The mutation changes the log message from "for testing purpose" to ""
    // This test indirectly verifies the original behavior is preserved
    const originalLog = console.log;
    let logCalled = false;
    console.log = (msg) => {
      if (msg === "") logCalled = true;
    };

    // Re-import to trigger the main block execution
    delete require.cache[require.resolve('./crawler-url-parser.js')];
    require('./crawler-url-parser.js');

    console.log = originalLog;
    expect(logCalled).toBe(false);
  });
});