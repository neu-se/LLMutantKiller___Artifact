describe('module loading side effects', () => {
  it('should not log to console when imported as a module', () => {
    const logCalls: string[] = [];
    const originalLog = console.log;
    console.log = (...args: any[]) => { logCalls.push(String(args[0])); };

    try {
      const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
      delete require.cache[modulePath];
      require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    } finally {
      console.log = originalLog;
    }

    expect(logCalls).not.toContain('for testing purpose');
  });
});