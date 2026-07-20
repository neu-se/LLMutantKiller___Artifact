import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should have Delta available as module.exports.default', () => {
    // This test verifies the module export structure
    // The mutation changes the condition from checking module type to always false
    // which breaks the CommonJS export pattern
    const delta = new Delta().insert('test');
    expect(delta.ops).toEqual([{ insert: 'test' }]);
    
    // This assertion will fail on mutated code because module.exports.default won't be set
    expect((Delta as any).default).toBeDefined();
  });
});