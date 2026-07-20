import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('length of op with object retain is 1', () => {
    // This should be 1 in both original and mutated
    expect(Op.length({ retain: { key: 'val' } })).toEqual(1);
  });

  it('length of op with null retain and string insert differs between original and mutated', () => {
    // Force retain to be null at runtime
    const op: Record<string, unknown> = {};
    op['retain'] = null;
    op['insert'] = 'hello';
    // Original: null retain fails !== null check, falls to else, returns 5
    // Mutated: null retain passes && true check, returns 1
    expect(Op.length(op as any)).toEqual(5);
  });
});