describe('module load console output', () => {
  it('should log "for testing purpose" when the module is loaded', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    jest.resetModules();
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});