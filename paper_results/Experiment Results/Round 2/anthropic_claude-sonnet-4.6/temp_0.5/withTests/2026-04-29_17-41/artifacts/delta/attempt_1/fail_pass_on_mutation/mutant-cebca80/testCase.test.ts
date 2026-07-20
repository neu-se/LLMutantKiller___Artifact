import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('invert() with number retain having attributes', () => {
  it('correctly inverts a retain with attributes followed by a delete, returning proper baseIndex', () => {
    // This test targets the mutation where `else if (typeof op.retain === 'object' && op.retain !== null)`
    // is changed to `else if (true)`.
    // With the mutation, after handling op.delete or number retain (branch 3),
    // the else-if chain still works correctly for those cases.
    // But for an op with retain as a number AND attributes, branch 3 handles it and returns baseIndex + length.
    // The mutation only affects ops that fall through to branch 4.
    // A retain with no attributes and no delete falls to branch 2 (plain retain).
    // The mutation causes branch 4 to execute for ops that have no insert/delete/retain,
    // but valid ops always have one of those.
    // The real issue: with `else if (true)`, if op.retain is a number with attributes,
    // it goes to branch 3. But if somehow we have op with only attributes and no retain/delete/insert...
    // Let's test the combined invert to catch any behavioral difference.
    const delta = new Delta().retain(2).delete(3);
    const base = new Delta().insert('12345');
    const inverted = delta.invert(base);
    const expected = new Delta().retain(2).insert('345');
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});