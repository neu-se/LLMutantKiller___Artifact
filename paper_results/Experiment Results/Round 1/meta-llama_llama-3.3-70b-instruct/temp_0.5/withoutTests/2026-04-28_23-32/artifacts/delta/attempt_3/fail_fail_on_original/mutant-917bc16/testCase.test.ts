import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');

    const delta2 = new Delta();
    delta2.retain(5);
    delta2.insert(' world');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello' },
      { retain: 5 },
      { insert: ' world' },
    ]);
  });
});