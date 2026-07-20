import Delta from "../../src/Delta";

describe('insert()', () => {
  it('should insert an embed object with a length property of 0 without skipping', () => {
    // Original: if (typeof arg === 'string' && arg.length === 0) -> only skips empty strings
    // Mutant:   if (true && arg.length === 0) -> skips anything with .length === 0
    // An object with a 'length' property of 0 should be inserted by original but skipped by mutant
    const embed = { src: 'http://example.com', length: 0 } as unknown as Record<string, unknown>;
    const delta = new Delta().insert(embed);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: embed });
  });
});