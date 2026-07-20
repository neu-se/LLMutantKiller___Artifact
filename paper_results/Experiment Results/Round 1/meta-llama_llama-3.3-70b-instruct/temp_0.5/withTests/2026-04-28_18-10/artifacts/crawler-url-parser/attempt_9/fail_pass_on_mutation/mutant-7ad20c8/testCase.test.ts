import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    const originalCodeResult = parse(url);
    expect(originalCodeResult).not.toBeNull();
    // Since the mutated code will always execute the code inside the if statement,
    // we can check if the code inside the if statement has any side effects.
    // In this case, the code inside the if statement has a console.log statement.
    // So, we can test for the fact that the original code doesn't have this side effect,
    // whereas the mutated code does.
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse(url);
    expect(consoleLogSpy).not.toHaveBeenCalledWith('for testing purpose');
    consoleLogSpy.mockRestore();
  });
});