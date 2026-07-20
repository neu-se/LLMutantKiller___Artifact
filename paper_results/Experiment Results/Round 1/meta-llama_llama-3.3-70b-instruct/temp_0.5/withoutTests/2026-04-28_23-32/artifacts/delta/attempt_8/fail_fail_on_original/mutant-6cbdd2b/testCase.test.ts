import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose deltas correctly with retain', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain(0, { bold: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ retain: 5, attributes: { bold: true } }]);
  });
});