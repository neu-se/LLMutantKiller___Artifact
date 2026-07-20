import * as vm from 'vm';
import * as fs from 'fs';
import * as path from 'path';
import * as Module from 'module';

describe('removeQueryParameters regex anchor', () => {
  it('should use anchored /^utm_\\w+/i regex (with ^ anchor) in result_normalize_options', () => {
    const capturedRegexes: RegExp[] = [];
    
    const OriginalRegExp = RegExp;
    
    // Clear module cache
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    // Override RegExp constructor to capture regex creations
    // Regex literals in V8 go through the RegExp constructor
    (global as any).RegExp = new Proxy(OriginalRegExp, {
      construct(target, args) {
        const r = new target(...args as [any, any]);
        capturedRegexes.push(r);
        return r;
      },
      apply(target, thisArg, args) {
        return target.apply(thisArg, args as [any, any]);
      }
    });
    
    try {
      require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    } finally {
      (global as any).RegExp = OriginalRegExp;
      // Restore module cache
      delete require.cache[modulePath];
    }
    
    // Find the utm regex among captured ones
    const utmRegex = capturedRegexes.find(r => r.source.includes('utm_'));
    expect(utmRegex).toBeDefined();
    // Original has ^ anchor: source should be '^utm_\\w+'
    // Mutated has no anchor: source would be 'utm_\\w+'
    expect(utmRegex!.source).toBe('^utm_\\w+');
  });
});