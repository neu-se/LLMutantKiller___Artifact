import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex pattern in result_normalize_options', () => {
  it('should use word character class \\w+ to match utm_source style parameters', () => {
    const path = require('path');
    const fs = require('fs');
    const vm = require('vm');

    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const src = fs.readFileSync(modulePath, 'utf8');

    // Augment the module source to expose the internal result_normalize_options
    const augmentedSrc = src + '\nmodule.exports._testOptions = result_normalize_options;';

    const moduleObj: { exports: any } = { exports: {} };
    const context = vm.createContext({
      require,
      module: moduleObj,
      exports: moduleObj.exports,
      __filename: modulePath,
      __dirname: path.dirname(modulePath),
      console,
      process,
    });

    vm.runInContext(augmentedSrc, context);

    const options = moduleObj.exports._testOptions;
    expect(options).toBeDefined();

    const removeQueryParams: Array<RegExp | string> = options.removeQueryParameters;
    const utmRegex = removeQueryParams.find((p): p is RegExp => p instanceof RegExp);

    expect(utmRegex).toBeDefined();
    // Original /^utm_\w+/i matches 'utm_source' (word chars after utm_)
    // Mutant /^utm_\W+/i does NOT match 'utm_source' (requires non-word chars)
    expect(utmRegex!.test('utm_source')).toBe(true);
    expect(utmRegex!.test('utm_medium')).toBe(true);
    expect(utmRegex!.test('utm_campaign')).toBe(true);
  });
});