import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly composes when source delta has unmerged adjacent retains', () => {
    // Construct a delta with unmerged adjacent retains directly
    // this = [insert "A", retain 1, retain 2]
    // other = [retain 1]
    //
    // With optimization: insert "A" is pre-consumed, main loop processes
    // retain 1 against exhausted otherIter, early return fires with
    // thisIter.rest() = [{retain:2}], concat merges retain 1+2=3, chop removes it
    // Result: [{insert:"A"}]
    //
    // Without optimization: early return fires after processing insert "A",
    // thisIter.rest() = [{retain:1},{retain:2}], concat only merges first via push,
    // second retain appended without merge, chop removes only last retain
    // Result: [{insert:"A"},{retain:1}]
    const a = new Delta([{ insert: 'A' }, { retain: 1 }, { retain: 2 }]);
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });
});