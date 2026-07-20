import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('detects mutation in compose retain start optimization condition', () => {
    // When other starts with a plain retain and this has a long insert,
    // the original condition (thisIter.peekLength() <= firstLeft) is false for long inserts
    // but true for short ones. With mutation=false, ALL inserts skip the otherIter.next() path.
    // This matters when other's first op is a retain that is SHORTER than this's insert.
    const a = new Delta().insert('ABCDE'); // length 5
    const b = new Delta().retain(3).delete(2); // retain 3, delete 2
    // original: inserts 'ABC' fit in retain(3), then 'DE' gets deleted
    // result should be: insert 'ABC'
    const expected = new Delta().insert('ABC');
    expect(a.compose(b)).toEqual(expected);
  });
});