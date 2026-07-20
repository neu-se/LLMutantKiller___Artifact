import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs without a protocol', () => {
    const url = '//example.com';
    const resultOriginal = parse(url);
    expect(resultOriginal.url).toBe('http://example.com');

    // To test the difference between the original and mutated code,
    // we need to test a URL that will be affected by the mutation.
    // The mutation changes the regex to remove the '^' character,
    // which means it will now match any URL, not just those at the start.
    // So, we test a URL that starts with 'http://' and then has a colon.
    const url2 = 'http://example:com';
    const resultMutated = parse(url2);
    expect(resultMutated.url).toBe('http://http://example:com'); // This should fail on the mutated code
  });
});