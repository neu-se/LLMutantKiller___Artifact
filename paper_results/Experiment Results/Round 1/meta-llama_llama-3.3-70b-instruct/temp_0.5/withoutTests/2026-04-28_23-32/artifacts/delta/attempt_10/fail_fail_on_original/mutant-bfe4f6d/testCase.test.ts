import Delta from '../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('composes correctly when first other is null or has a retain number', () => {
    const delta1 = new Delta([{ retain: 1, attributes: {} }, { insert: 'a' }]);
    const delta2 = new Delta([{ retain: 1 }, { insert: 'b' }]);
    const composed = delta1.compose(delta2);
    expect(composed.ops.length).toBe(2);
    expect(composed.ops[0].retain).toBe(1);
    expect(composed.ops[1].insert).toBe('b');
    const delta3 = new Delta([null, { insert: 'c' }]);
    expect(() => delta1.compose(delta3)).toThrowError('no handlers for embed type "undefined"');
  });
});