import Delta from "../../src/Delta";

describe('insert()', () => {
  it('should insert an embed object that has a length property equal to 0', () => {
    // Original: only skips insert if arg is a string AND length === 0
    // Mutant: skips insert if arg.length === 0 (regardless of type)
    // An object with { length: 0 } should still be inserted
    const delta = new Delta().insert({ length: 0 } as unknown as Record<string, unknown>);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: { length: 0 } });
  });
});