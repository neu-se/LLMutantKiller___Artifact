import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('correctly composes with retain optimization affecting early return', () => {
    // this: insert "a", retain 3 (with attributes)
    // other: retain 4
    // With optimization: insert "a" is pre-collected (len 1 <= 4), otherIter advances by 1
    // Main loop: retain(3) vs retain(3), newOp = retain(3), early return check fires
    // delta already has [insert "a"], last op is insert "a", newOp is retain(3) - not equal, no early return
    // Without optimization: retain(1) vs insert("a")... wait this doesn't work
    const a = new Delta().insert('a').retain(3, { bold: true });
    const b = new Delta().retain(4);
    const composed = a.compose(b);
    expect(composed.ops).toEqual([{ insert: 'a' }, { retain: 3, attributes: { bold: true } }]);
  });
});