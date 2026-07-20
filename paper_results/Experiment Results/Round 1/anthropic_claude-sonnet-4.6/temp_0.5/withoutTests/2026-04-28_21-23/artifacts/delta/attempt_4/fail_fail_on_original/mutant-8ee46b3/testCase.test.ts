import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transforms with number retain where length differs from otherData', () => {
    // Force a case where otherIter.next(length) returns op with retain !== length
    // This happens when the op was partially consumed before
    const a = new Delta().insert('a').insert('b'); // two inserts
    const b = new Delta().retain(1); 
    // a has inserts, so thisIter.peekType() === 'insert', priority=false
    // delta.retain(Op.length(thisIter.next())) = retain(1), retain(1)
    // then otherIter is exhausted
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 1 }, { retain: 1 }, { retain: 1 }]);
  });
});