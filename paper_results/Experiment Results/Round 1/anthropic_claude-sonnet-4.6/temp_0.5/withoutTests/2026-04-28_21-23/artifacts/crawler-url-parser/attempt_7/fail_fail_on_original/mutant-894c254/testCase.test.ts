import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchor via RegExp interception', () => {
  it('captures the regex used in removeQueryParameters', () => {
    // Re-require the module after setting up interception
    const capturedRegexes: RegExp[] = [];
    const OriginalRegExp = RegExp;
    
    // Clear module cache and re-require with interception
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Intercept RegExp constructor
    (global as any).RegExp = function(...args: any[]) {
      const r = new OriginalRegExp(...args);
      capturedRegexes.push(r);
      return r;
    };
    (global as any).RegExp.prototype = OriginalRegExp.prototype;
    
    require(modulePath);
    
    // Restore
    (global as any).RegExp = OriginalRegExp;
    
    // Check if any captured regex matches 'autm_source' differently
    // Original /^utm_\w+/i: won't match 'autm_source'
    // Mutant /utm_\w+/i: will match 'autm_source'
    const utmRegex = capturedRegexes.find(r => r.test('utm_source'));
    expect(utmRegex).toBeDefined();
    expect(utmRegex!.test('autm_source')).toBe(false);
  });
});