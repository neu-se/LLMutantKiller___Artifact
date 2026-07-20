import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('insert()', () => {
  it('should insert an embed object with a length property of 0 without skipping', () => {
    // The mutation changes: if (typeof arg === 'string' && arg.length === 0)
    // to: if (true && arg.length === 0)
    // This means an object embed with { someKey: ..., length: 0 } would be incorrectly skipped
    // by the mutant, but correctly inserted by the original code.
    const embed = { image: 'http://example.com', length: 0 } as unknown as Record<string, unknown>;
    const delta = new Delta().insert(embed);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: embed });
  });
});