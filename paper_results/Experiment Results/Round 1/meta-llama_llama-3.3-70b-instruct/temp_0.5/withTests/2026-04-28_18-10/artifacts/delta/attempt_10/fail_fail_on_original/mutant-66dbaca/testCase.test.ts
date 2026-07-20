import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    const moduleExportsBefore = module.exports;
    require('../../../../../../../../../subject_repositories/delta/src/Delta');
    const moduleExportsAfter = module.exports;
    expect(moduleExportsBefore).not.toEqual(moduleExportsAfter);
  });
});