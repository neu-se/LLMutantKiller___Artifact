import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS export', () => {
  it('should have Delta in module.exports', () => {
    // Check if we're in a CommonJS environment
    if (typeof module === 'object' && module.exports) {
      // In original code, module.exports.default should be Delta
      // In mutated code, module.exports will be empty
      expect(module.exports.default).toBe(Delta);
    }

    // Also verify basic functionality works
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});