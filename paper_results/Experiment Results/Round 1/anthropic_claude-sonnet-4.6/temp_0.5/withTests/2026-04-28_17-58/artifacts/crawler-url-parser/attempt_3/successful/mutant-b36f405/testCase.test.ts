import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex pattern in result_normalize_options', () => {
  it('should use word character class \\w+ to match utm_source style parameters', () => {
    const path = require('path');
    const fs = require('fs');
    const vm = require('vm');

    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    const src = fs.readFileSync(modulePath, 'utf8');

    // Augment the module source to expose the internal result_normalize_options
    // and test the regex directly inside the VM context
    const augmentedSrc = src + `
module.exports._utmRegexMatchesSource = (function() {
  var utmRegex = result_normalize_options.removeQueryParameters.filter(function(p) {
    return typeof p === 'object' && p !== null && typeof p.test === 'function';
  })[0];
  if (!utmRegex) return null;
  return {
    matchesUtmSource: utmRegex.test('utm_source'),
    matchesUtmMedium: utmRegex.test('utm_medium'),
    matchesUtmCampaign: utmRegex.test('utm_campaign'),
  };
})();
`;

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

    const result = moduleObj.exports._utmRegexMatchesSource;
    expect(result).not.toBeNull();
    // Original /^utm_\w+/i matches 'utm_source' (word chars after utm_)
    // Mutant /^utm_\W+/i does NOT match 'utm_source' (requires non-word chars)
    expect(result.matchesUtmSource).toBe(true);
    expect(result.matchesUtmMedium).toBe(true);
    expect(result.matchesUtmCampaign).toBe(true);
  });
});