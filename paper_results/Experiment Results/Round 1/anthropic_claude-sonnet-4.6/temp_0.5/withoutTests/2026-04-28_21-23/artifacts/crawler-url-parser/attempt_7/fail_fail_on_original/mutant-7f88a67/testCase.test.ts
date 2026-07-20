import * as Module from 'module';

describe("normalizeHttps option", () => {
  it("normalizeHttps should be false in result_normalize_options", () => {
    // Intercept normalize-url before crawler-url-parser loads it
    const originalLoad = (Module as any)._load;
    let capturedOptions: any = null;

    (Module as any)._load = function(request: string, ...args: any[]) {
      const result = originalLoad.apply(this, [request, ...args]);
      if (request === 'normalize-url' || (typeof request === 'string' && request.includes('normalize-url'))) {
        if (typeof result === 'function') {
          return function(url: string, options: any) {
            capturedOptions = { ...options };
            return result(url, options);
          };
        }
      }
      return result;
    };

    // Clear cache and reload to capture options
    const resolvedPath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[resolvedPath];

    try {
      const mod = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
      mod.parse('https://example.com/path');
    } finally {
      (Module as any)._load = originalLoad;
      delete require.cache[resolvedPath];
    }

    expect(capturedOptions).not.toBeNull();
    expect(capturedOptions.normalizeHttps).toBe(false);
  });
});