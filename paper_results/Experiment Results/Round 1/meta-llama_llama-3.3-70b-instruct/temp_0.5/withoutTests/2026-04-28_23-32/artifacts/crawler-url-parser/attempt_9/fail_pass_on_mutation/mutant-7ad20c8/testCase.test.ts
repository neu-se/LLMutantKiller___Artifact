import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and not exit the process', () => {
    const originalProcessExit = process.exit;
    process.exit = jest.fn();
    const url1 = "https://www.npmjs.com/package/electron-window-manager";
    const url2 = "https://www.example.com";
    parse(url1);
    parse(url2);
    expect(process.exit).not.toHaveBeenCalled();
    process.exit = originalProcessExit;
  });
});