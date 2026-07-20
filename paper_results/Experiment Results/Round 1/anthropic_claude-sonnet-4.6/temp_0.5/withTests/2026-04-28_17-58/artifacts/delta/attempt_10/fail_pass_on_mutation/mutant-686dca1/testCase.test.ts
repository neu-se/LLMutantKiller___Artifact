describe('Delta CommonJS module export', () => {
  it('should not have __esModule marker when CJS block runs correctly', () => {
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const required = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
      
      // Original: module.exports = Delta replaces exports, removing __esModule marker
      // __esModule will be undefined or false on the Delta function
      //
      // Mutated: block skipped, original TS-compiled exports remain with __esModule: true
      
      expect((required as Record<string, unknown>).__esModule).toBeFalsy();
    });
  });
});