describe('crawler-url-parser module load logging', () => {
  it('should call console.log with "for testing purpose" when module is loaded', () => {
    const originalLog = console.log;
    const calls: any[][] = [];
    
    console.log = (...args: any[]) => {
      calls.push(args);
    };
    
    try {
      jest.resetModules();
      require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
      
      const loggedMessages = calls.map(c => c[0]);
      expect(loggedMessages).toContain('for testing purpose');
    } finally {
      console.log = originalLog;
    }
  });
});