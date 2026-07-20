import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('insert after embed+delete should splice correctly preserving order', () => {
    // embed insert, then delete, then string insert
    // The string insert triggers reorder: index--, lastOp becomes the embed insert
    // embed and string don't merge, so we fall through to splice/push
    // index is now ops.length - 1 (pointing before the delete)
    // splice(index, 0, newOp) inserts before delete - correct behavior
    const delta = new Delta().insert({ embed: 1 }).delete(1).insert('a');
    const expected = new Delta().insert({ embed: 1 }).insert('a').delete(1);
    expect(delta).toEqual(expected);
    expect(delta.ops).toEqual([{ insert: { embed: 1 } }, { insert: 'a' }, { delete: 1 }]);
  });
});