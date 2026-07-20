import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    const moduleExportsBefore = JSON.stringify(module.exports);
    const delta = new Delta();
    const moduleExportsAfter = JSON.stringify(module.exports);
    expect(moduleExportsBefore).not.toEqual(moduleExportsAfter);
  });
});