import Delta from "../../../../../../../../../subject_repositories/delta/dist/Delta";

describe('insert()', () => {
  it('should insert an embed object with a length property of 0', () => {
    const embed: Record<string, unknown> = { src: 'http://example.com', length: 0 };
    const delta = new Delta().insert(embed);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ insert: embed });
  });
});