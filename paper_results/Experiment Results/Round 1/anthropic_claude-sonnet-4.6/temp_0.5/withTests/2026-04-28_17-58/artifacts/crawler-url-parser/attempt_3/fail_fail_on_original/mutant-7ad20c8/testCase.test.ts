describe('module loading side effects', () => {
  it('should not call console.log when the module is required as a dependency', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});
    
    const modulePath = require.resolve('../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    
    consoleSpy.mockClear();
    
    require('../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});