import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not print to console when module.parent is truthy', () => {
    const originalConsoleLog = console.log;
    console.log = jest.fn();
    const moduleParent = module.parent;
    module.parent = {};
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(console.log).not.toHaveBeenCalled();
    module.parent = moduleParent;
    console.log = originalConsoleLog;
  });
});