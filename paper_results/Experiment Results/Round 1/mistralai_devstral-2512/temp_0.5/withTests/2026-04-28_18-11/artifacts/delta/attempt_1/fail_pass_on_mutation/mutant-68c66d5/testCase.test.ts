import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should be properly exported and functional in CommonJS context', () => {
    // This test verifies that the module exports are working correctly
    // The mutation changes the export condition to "if (false)" which breaks CommonJS exports
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});