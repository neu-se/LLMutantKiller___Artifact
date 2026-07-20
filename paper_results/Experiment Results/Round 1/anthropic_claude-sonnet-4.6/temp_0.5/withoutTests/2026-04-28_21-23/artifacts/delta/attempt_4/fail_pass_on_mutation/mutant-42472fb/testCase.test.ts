import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when this starts with inserts and other starts with a retain', () => {
    const a = new Delta()
      .insert({ image: 'url' })
      .insert({ image: 'url2' })
      .retain(3);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: { image: 'url' } },
      { insert: { image: 'url2' } },
    ]);
  });
});