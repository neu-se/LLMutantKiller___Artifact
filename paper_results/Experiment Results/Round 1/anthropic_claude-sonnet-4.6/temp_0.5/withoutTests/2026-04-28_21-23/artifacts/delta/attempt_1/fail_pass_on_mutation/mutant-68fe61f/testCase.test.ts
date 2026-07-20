import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta module export', () => {
  it('should export Delta as a constructor that can create instances', () => {
    const delta = new Delta([{ insert: 'hello' }]);
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    
    // Verify Delta has static methods
    expect(typeof Delta.registerEmbed).toBe('function');
    
    // Compose should work
    const a = new Delta().insert('hello');
    const b = new Delta().retain(5).insert(' world');
    const composed = a.compose(b);
    expect(composed.ops).toEqual([{ insert: 'hello world' }]);
  });
});