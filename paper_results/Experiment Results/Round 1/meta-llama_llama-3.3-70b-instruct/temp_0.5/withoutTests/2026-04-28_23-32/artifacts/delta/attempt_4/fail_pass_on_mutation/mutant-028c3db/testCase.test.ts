import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(5);
    const composed = delta1.compose(delta2);
    expect(composed.length()).toBe(5);
  });
});