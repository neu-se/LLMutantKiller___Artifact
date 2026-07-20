import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization does not copy delete ops from this', () => {
    const a = new Delta().delete(2).insert('Hello');
    const b = new Delta().retain(4);
    // b retains 4 chars: the 'Hello' insert (length 5 in a, but delete doesn't count)
    // After compose: delete(2) stays, Hello stays
    const expected = new Delta().delete(2).insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});