describe('Q module loading with undefined process.env', () => {
  it('should load without throwing when process.env is undefined', () => {
    const originalEnv = process.env;
    
    Object.defineProperty(process, 'env', {
      value: undefined,
      configurable: true,
      writable: true
    });
    
    try {
      jest.resetModules();
      expect(() => {
        require('../../../../../../../../../../../subject_repositories/q/q.js');
      }).not.toThrow();
    } finally {
      Object.defineProperty(process, 'env', {
        value: originalEnv,
        configurable: true,
        writable: true
      });
      jest.resetModules();
    }
  });
});