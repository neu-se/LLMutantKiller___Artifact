import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should handle null embed correctly', () => {
    const a = { embed: 1 };
    const b = null;
    const delta = new Delta().insert(a);
    const result = delta.compose(new Delta().retain(b as any));
    expect(result.ops).toEqual([{ insert: { embed: 1 } }]);
  });
});