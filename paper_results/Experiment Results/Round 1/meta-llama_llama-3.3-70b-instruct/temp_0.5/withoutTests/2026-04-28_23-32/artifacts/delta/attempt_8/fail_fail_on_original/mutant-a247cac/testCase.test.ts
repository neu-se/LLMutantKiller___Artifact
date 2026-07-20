import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.retain(1);
    const delta2 = new Delta();
    delta2.retain(2);
    const composed = delta1.compose(delta2);
    expect(composed.changeLength()).toBe(3);
    expect(composed.length()).toBe(3);
  });
});