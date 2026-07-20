import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle compose correctly when firstOther is not null and retain is a number', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, World!');
    const delta2 = new Delta();
    delta2.retain(7);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.length()).toBe(13);
    const delta3 = new Delta();
    delta3.retain(7);
    const delta4 = new Delta();
    delta4.insert('Hello, World!');
    const composedDelta2 = delta3.compose(delta4);
    expect(composedDelta2.length()).toBe(13);
    expect(composedDelta2.ops[0].insert).not.toBeUndefined();
    expect(composedDelta.ops[0].insert).not.toBeUndefined();
  });
});