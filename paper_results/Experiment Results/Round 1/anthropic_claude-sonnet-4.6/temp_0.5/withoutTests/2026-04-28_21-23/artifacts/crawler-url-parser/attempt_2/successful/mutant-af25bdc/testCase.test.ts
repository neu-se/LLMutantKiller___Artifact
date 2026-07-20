describe('crawler-url-parser console.log mutation detection', () => {
  it('should log "for testing purpose" when module is loaded', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    jest.resetModules();

    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    const loggedMessages = consoleSpy.mock.calls.map((call) => call[0]);
    expect(loggedMessages).toContain('for testing purpose');

    consoleSpy.mockRestore();
  });
});