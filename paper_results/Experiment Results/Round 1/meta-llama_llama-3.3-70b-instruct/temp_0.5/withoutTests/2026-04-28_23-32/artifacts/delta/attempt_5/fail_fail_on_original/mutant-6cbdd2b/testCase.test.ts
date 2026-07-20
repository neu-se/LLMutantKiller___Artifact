import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose deltas correctly with retain and insert', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert('test');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ retain: 5 }, { insert: 'test' }]);
  });
});