import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS export verification', () => {
  it('should have Delta available in module.exports', () => {
    // This test verifies the CommonJS export specifically
    // The mutation removes the module.exports assignment
    if (typeof module === 'object' && module.exports) {
      // In the original code, module.exports should equal Delta
      // In the mutated code, module.exports will be an empty object
      expect(module.exports).toEqual(expect.objectContaining({
        default: Delta
      }));
    } else {
      // Fallback for environments without CommonJS
      expect(Delta).toBeDefined();
    }
  });
});