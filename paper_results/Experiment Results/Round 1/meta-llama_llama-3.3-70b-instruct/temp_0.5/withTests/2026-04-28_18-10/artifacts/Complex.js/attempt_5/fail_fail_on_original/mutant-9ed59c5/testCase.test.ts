import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should define the Complex class when using AMD', () => {
    const originalDefine = define;
    define = function() {};
    const originalExport = exports;
    exports = {};
    try {
      require('./complex.js');
      expect(Object.keys(exports)).toContain('Complex');
    } finally {
      define = originalDefine;
      exports = originalExport;
    }
  });
});