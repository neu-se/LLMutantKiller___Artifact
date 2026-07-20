import { Delta } from '../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle compose with a retain operation and an empty string', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert('');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toBe(5);
  });
});