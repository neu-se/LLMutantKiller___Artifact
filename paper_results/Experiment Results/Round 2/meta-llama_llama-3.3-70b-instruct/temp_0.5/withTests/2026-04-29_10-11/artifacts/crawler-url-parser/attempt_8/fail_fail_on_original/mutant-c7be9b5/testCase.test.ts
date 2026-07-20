import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    // Add a check for the console.log statement
    const consoleLogSpy = jest.spyOn(console, 'log');
    // Load the module again to check if the console.log statement is executed
    const modulePath = require.resolve('../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser');
    delete require.cache[modulePath];
    require(modulePath);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  });
});