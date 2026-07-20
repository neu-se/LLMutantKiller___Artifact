describe('Delta', () => {
  it('should only export as a module when module is an object', () => {
    const originalModule = global.module;
    global.module = {};
    const DeltaModule = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule).toBeDefined();
    global.module = 'not an object';
    const DeltaModule2 = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule2).toBeUndefined();
    global.module = originalModule;
  });
});