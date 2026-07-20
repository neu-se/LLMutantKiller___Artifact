describe('module load console output', () => {
  it('should log "for testing purpose" when the module is loaded', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    const modulePath = require.resolve('../crawler-url-parser.js');
    delete require.cache[modulePath];
    
    require('../crawler-url-parser.js');
    
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
    
    consoleSpy.mockRestore();
  });
});