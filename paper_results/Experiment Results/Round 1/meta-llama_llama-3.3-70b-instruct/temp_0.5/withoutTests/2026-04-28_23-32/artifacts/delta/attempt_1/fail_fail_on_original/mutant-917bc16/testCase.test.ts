import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(1, { bold: true });
    delta1.insert('world!');

    const delta2 = new Delta();
    delta2.retain(7);
    delta2.insert(' again');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toHaveLength(3);
    expect(composedDelta.ops[0].insert).toBe('Hello, ');
    expect(composedDelta.ops[1].retain).toBe(1);
    expect(composedDelta.ops[1].attributes).toEqual({ bold: true });
    expect(composedDelta.ops[2].insert).toBe('world! again');
  });
});