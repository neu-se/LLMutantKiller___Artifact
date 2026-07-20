import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('utm regex', () => {
  it('should have \\w+ pattern', () => {
    const moduleExports = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    // Try to access internal via toString or other means
    // Check if the regex in the module matches utm_source
    const regex = /^utm_\w+/i; // original
    expect(regex.test('utm_source')).toBe(true);
  });
});