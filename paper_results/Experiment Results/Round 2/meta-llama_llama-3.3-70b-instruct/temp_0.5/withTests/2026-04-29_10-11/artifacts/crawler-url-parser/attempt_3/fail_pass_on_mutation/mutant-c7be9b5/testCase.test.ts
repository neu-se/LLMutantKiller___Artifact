import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    console.log("Test executed");
  });
});