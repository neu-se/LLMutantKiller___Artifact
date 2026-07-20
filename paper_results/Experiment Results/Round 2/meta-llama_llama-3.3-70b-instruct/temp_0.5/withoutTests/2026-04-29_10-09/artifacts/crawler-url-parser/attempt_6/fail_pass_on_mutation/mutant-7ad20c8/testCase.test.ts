import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not enter the testing block when imported', () => {
    const originalProcessExit = process.exit;
    process.exit = jest.fn();
    parse('https://www.npmjs.com/package/electron-window-manager');
    expect(process.exit).not.toHaveBeenCalled();
    process.exit = originalProcessExit;
  });
});