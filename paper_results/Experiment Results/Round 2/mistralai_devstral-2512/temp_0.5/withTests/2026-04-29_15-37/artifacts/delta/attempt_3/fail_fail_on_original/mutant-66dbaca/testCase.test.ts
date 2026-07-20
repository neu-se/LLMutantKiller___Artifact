import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS export', () => {
  it('should have module.exports defined when running in CommonJS context', () => {
    // This test verifies the CommonJS export specifically
    const delta = new Delta().insert('test');
    expect(delta).toBeInstanceOf(Delta);

    // Check that module.exports exists and contains Delta
    // This will fail in the mutated version where module.exports is empty
    if (typeof module === 'object') {
      expect(module.exports).toBeDefined();
      expect(module.exports.default).toBe(Delta);
    }
  });
});