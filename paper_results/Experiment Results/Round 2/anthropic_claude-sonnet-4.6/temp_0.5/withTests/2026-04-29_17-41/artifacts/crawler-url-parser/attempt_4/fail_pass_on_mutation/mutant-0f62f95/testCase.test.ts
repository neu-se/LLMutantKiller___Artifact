describe('module import side effects', () => {
  it('should not execute the direct-run block when required as a module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const modulePath = require.resolve('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    require('../../../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');

    consoleSpy.mockRestore();
  });
});