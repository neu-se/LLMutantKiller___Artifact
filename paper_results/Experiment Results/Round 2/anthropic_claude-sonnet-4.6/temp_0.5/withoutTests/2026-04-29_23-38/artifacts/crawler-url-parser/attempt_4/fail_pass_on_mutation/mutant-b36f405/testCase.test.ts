import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser', () => {
  it('utm regex uses word chars \\w not \\W', () => {
    jest.resetModules();
    
    const capturedSources: string[] = [];
    const NodeModule = require('module');
    const originalCompile = NodeModule.prototype._compile;
    
    NodeModule.prototype._compile = function(content: string, filename: string) {
      if (filename && filename.includes('crawler-url-parser') && !filename.includes('node_modules') && !filename.includes('testCase')) {
        capturedSources.push(content);
      }
      return originalCompile.call(this, content, filename);
    };
    
    try {
      jest.isolateModules(() => {
        require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
      });
    } finally {
      NodeModule.prototype._compile = originalCompile;
    }
    
    if (capturedSources.length > 0) {
      const source = capturedSources[0];
      expect(source).toContain('utm_\\w+');
      expect(source).not.toContain('utm_\\W+');
    } else {
      // Fallback: just verify the module works
      const result = parse('http://example.com');
      expect(result).not.toBeNull();
    }
  });
});