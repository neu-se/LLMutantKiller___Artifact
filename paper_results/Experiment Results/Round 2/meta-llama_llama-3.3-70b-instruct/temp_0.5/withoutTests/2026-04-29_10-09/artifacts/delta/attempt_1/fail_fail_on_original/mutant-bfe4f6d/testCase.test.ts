import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle compose correctly when firstOther is not null and retain is a number', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    delta1.insert('Hello, ');
    delta2.retain(7);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toBe(7);
  });

  // it('should handle compose correctly when firstOther is null or retain is not a number', () => {
  //   const delta1 = new Delta();
  //   const delta2 = new Delta();
  //   delta1.insert('Hello, ');
  //   delta2.insert('World!');
  //   const composedDelta = delta1.compose(delta2);
  //   expect(composedDelta.ops.length).toBe(2);
  //   expect(composedDelta.ops[0].insert).toBe('Hello, ');
  //   expect(composedDelta.ops[1].insert).toBe('World!');
  // });
});