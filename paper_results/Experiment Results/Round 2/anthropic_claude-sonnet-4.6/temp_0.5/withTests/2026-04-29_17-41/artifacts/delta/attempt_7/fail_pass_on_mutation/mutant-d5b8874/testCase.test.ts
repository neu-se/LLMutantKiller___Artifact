import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain null followed by more ops - delete behavior differs between original and mutated', () => {
    // Place retain:null before another op so chop() doesn't remove it
    // and the delete from b should appear after it in mutated but not original
    const a = new Delta([{ retain: null as any }, { insert: 'x' }]);
    const b = new Delta([{ delete: 1 }, { retain: 1 }]);
    const result = a.compose(b);
    // Original: retain:null + delete -> condition false -> delete NOT pushed
    // Mutated:  retain:null + delete -> condition true -> delete IS pushed
    const deleteOps = result.ops.filter((op) => typeof op.delete === 'number');
    expect(deleteOps).toHaveLength(0);
  });
});