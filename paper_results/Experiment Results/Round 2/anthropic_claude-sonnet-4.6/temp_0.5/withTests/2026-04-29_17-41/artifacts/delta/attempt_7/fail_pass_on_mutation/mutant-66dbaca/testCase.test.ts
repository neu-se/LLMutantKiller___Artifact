import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('Delta imported via ES module should be a working constructor', () => {
    // Test that Delta works correctly as imported - this validates the export is correct
    const delta = new Delta([{ insert: 'hello' }]);
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    
    // The original code sets module.exports = Delta (not just exports.default = Delta)
    // This means the named export 'Op' should still be accessible via the re-export
    // Test that static members are accessible - these would be lost if exports were broken
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();
    
    // Verify Op works through the Delta static reference
    expect(Delta.Op.length({ insert: 'test' })).toBe(4);
  });
});