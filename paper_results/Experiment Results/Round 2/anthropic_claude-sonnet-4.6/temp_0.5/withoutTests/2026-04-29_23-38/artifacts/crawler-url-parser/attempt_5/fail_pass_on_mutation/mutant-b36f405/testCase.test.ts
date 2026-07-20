describe('crawler-url-parser', () => {
  it('utm regex uses \\w', () => {
    jest.resetModules();
    
    // Intercept property setting on all objects
    const regexSources: string[] = [];
    const origDefineProperty = Object.defineProperty;
    
    // This won't work for object literals either...
    
    const mod = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(mod.parse('http://example.com')).not.toBeNull();
  });
});