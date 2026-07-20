import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization', () => {
  it('should correctly compose when this starts with retain and other starts with plain retain', () => {
    const delta1 = new Delta().retain(3).insert('hello');
    const delta2 = new Delta().retain(8);
    const composed = delta1.compose(delta2);
    const expected = new Delta().retain(3).insert('hello');
    expect(composed.ops).toEqual(expected.ops);
  });
});