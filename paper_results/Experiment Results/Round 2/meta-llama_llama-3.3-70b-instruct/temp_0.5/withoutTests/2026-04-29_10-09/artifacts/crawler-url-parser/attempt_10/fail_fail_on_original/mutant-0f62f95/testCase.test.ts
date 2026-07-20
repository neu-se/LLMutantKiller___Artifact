describe('parse function', () => {
  it('should not log anything to the console when the module is required as a module', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    const moduleParent = module.parent;
    module.parent = null;
    const crawlerUrlParser = require('./crawler-url-parser.js');
    module.parent = moduleParent;
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});