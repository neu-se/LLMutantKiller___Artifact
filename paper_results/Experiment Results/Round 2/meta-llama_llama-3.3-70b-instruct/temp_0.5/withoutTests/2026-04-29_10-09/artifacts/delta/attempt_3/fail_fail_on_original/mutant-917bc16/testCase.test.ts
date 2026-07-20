import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(7);
    const delta2 = new Delta();
    delta2.retain(7);
    const composed = delta1.compose(delta2);
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[0].retain).toBe(14);
  });
});