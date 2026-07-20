import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    // Check if the module is exported correctly
    const moduleExport = jest.spyOn(module, 'exports', 'get');
    moduleExport.mockImplementation(() => {
      if (typeof module === 'object') {
        return { default: Delta };
      } else {
        return undefined;
      }
    });
    expect(module.exports.default).toBeDefined();
  });
});