import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should handle null embed correctly', () => {
    const delta = new Delta();
    delta.insert({ embed: null });
    const result = delta.compose(new Delta().retain({ embed: 1 }));
    expect(result.ops).toEqual([{ insert: { embed: 1 } }]);
  });
});