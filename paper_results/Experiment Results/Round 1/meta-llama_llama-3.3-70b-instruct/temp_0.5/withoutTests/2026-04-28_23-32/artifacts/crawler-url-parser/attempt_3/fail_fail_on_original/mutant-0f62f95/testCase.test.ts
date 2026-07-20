import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not print to console when module.parent is falsy', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const originalModuleParent = module.parent;
    module.parent = null;
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(console.log).not.toHaveBeenCalled();
    module.parent = originalModuleParent;
    console.log = originalConsoleLog;
  });
});