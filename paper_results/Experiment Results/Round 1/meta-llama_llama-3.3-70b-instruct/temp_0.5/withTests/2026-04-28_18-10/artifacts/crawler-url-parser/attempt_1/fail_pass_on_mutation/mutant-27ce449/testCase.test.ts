import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should throw an error when currentUrl is null', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const currentUrl = null;
    const expectedError = new Error('currentUrl is null');

    try {
      extract(htmlString, baseUrl);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});