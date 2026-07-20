describe('module loading behavior', () => {
  it('should call console.log with "for testing purpose" when module is loaded without a parent', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    jest.resetModules();
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});