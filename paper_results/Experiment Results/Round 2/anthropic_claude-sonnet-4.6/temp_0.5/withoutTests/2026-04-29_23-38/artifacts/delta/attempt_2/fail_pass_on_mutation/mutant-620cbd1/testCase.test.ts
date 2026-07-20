import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('correctly handles compose where first op of other is a plain retain with subsequent ops', () => {
    const a = new Delta().insert('a').retain(1);
    const b = new Delta().retain(2).delete(1);
    // a represents doc: insert 'a', retain 1 char (total 2 chars)
    // b: retain 2, delete 1
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'a' }, { retain: 1 }, { delete: 1 }]);
  });
});