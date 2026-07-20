describe('Delta CommonJS export', () => {
  it('should be available via require in CommonJS context', () => {
    // This test directly checks the CommonJS export behavior
    // The mutation changes "if (typeof module === 'object')" to "if (false)"
    // which breaks the module.exports assignment
    const Delta = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
  });
});