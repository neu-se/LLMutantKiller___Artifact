import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly with a leading retain', () => {
    const delta1 = new Delta().retain(1);
    const delta2 = new Delta().retain(1);
    const composed = delta1.compose(delta2);
    expect(composed.length()).toBe(2);
  });
});