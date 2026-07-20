describe('Delta CommonJS export', () => {
  it('should export Delta via require', () => {
    // Use require to test CommonJS exports
    const DeltaModule = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');

    // Check that Delta is exported as default
    expect(DeltaModule.default).toBeDefined();
    expect(typeof DeltaModule.default).toBe('function');

    // Check that Delta is also exported directly
    expect(DeltaModule).toBeDefined();
    expect(typeof DeltaModule).toBe('function');

    // Verify they're the same class
    expect(DeltaModule.default).toBe(DeltaModule);

    // Test instantiation
    const instance = new DeltaModule();
    expect(instance).toBeInstanceOf(DeltaModule);
  });
});