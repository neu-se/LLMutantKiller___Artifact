import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly process baseUrl with fragment', () => {
    // Force a scenario where the two regexes might differ
    // by using a URL where URL.parse behavior with fragment matters
    const result = parse('', 'http://example.com/#section');
    // currentUrlStr is empty string - but wait, typeof '' !== 'undefined'
    // and ''.length would matter... let's check
    expect(result).not.toBeNull();
  });
});