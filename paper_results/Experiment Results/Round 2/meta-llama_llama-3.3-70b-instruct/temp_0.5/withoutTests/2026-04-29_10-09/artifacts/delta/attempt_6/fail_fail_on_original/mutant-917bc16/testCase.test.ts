import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    const delta2 = new Delta();
    delta2.retain(7);
    const composed = delta1.compose(delta2);
    expect(composed.ops[composed.ops.length - 1].retain).toBe(7);
  });
});