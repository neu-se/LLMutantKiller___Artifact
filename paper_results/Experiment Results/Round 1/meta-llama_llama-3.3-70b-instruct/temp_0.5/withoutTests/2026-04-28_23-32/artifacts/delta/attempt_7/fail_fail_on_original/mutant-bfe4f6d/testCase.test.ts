import Delta from '../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('composes correctly when first other is null or has a retain number', () => {
    const delta1 = new Delta([{ retain: 1, attributes: {} }, { insert: 'a' }]);
    const delta2 = new Delta([{ retain: 1 }, { insert: 'b' }]);
    const composed = delta1.compose(delta2);
    expect(composed.ops.length).toBe(2);
    expect(composed.ops[0].retain).toBe(1);
    expect(composed.ops[1].insert).toBe('b');
    // This test case should pass on the original code and fail on the mutated code
    // because the mutation changes the condition in the compose method
    // to always be true, which would cause incorrect behavior
    expect(delta1.compose(new Delta([null, { insert: 'c' }])).ops.length).toBe(1);
  });
});