import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the composition of two deltas when the first operation of the other delta is a retain with a number value', () => {
    const delta1 = new Delta([{ retain: 5 }]);
    const delta2 = new Delta([{ retain: 5, attributes: {} }]);
    const composed = delta1.compose(delta2);
    expect(composed.ops.length).toBeGreaterThan(0);
  });
});