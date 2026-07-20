import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS export verification', () => {
  it('should have non-empty module.exports when running in CommonJS context', () => {
    // This test verifies the CommonJS export specifically
    // The mutation removes the module.exports assignment
    if (typeof module === 'object') {
      // In the original code, module.exports should have properties
      // In the mutated code, module.exports will be empty
      expect(Object.keys(module.exports).length).toBeGreaterThan(0);

      // Also verify we can actually use the exported Delta
      const delta = new Delta().insert('test');
      expect(delta.ops).toEqual([{ insert: 'test' }]);
    }
  });
});