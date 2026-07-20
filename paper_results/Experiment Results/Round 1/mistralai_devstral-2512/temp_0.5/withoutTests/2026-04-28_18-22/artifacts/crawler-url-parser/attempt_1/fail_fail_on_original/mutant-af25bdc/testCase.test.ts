import { execSync } from 'child_process';
import { parse, extract, gettype } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not log empty string when run as main module', () => {
    // This test verifies that the module does not log an empty string when run as main
    // We capture stdout to check for the presence of the empty string log
    const originalLog = console.log;
    let loggedOutput = '';
    console.log = (msg) => {
      loggedOutput += msg;
    };

    // Simulate running the module as main by requiring it directly
    // This will trigger the module's main execution block
    const modulePath = './crawler-url-parser.js';
    execSync(`node ${modulePath}`, { encoding: 'utf8' });

    // Restore original console.log
    console.log = originalLog;

    // The original code logs "for testing purpose", the mutant logs ""
    // We expect the output to contain the original message, not an empty string
    expect(loggedOutput).toContain('for testing purpose');
    expect(loggedOutput).not.toBe('');
  });
});