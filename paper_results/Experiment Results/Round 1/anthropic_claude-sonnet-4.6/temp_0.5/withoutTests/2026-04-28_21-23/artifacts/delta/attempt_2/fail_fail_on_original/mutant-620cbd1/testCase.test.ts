import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('handles compose where other starts with retain larger than this inserts followed by delete', () => {
    const a = new Delta().insert('hello').retain(5);
    const b = new Delta().retain(3).delete(2).retain(5);
    const composed = a.compose(b);
    const expected = new Delta().insert('hel').delete(2).retain(5);
    expect(composed.ops).toEqual(expected.ops);
  });
});