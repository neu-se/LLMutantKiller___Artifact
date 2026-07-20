import * as cup from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('module exports and options', () => {
  it('should have result_normalize_options with normalizeHttps set to false', () => {
    // Access the module to check if normalizeHttps option is false (original)
    // vs true (mutated) - checking via parse behavior with a URL that
    // would be affected by https normalization
    const httpsResult = parse("https://example.com");
    const httpResult = parse("http://example.com");
    // Both should have different protocols - if normalizeHttps:true converts https->http
    // then both would return http: protocol
    expect(httpsResult.protocol).not.toBe(httpResult.protocol);
  });
});

import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";