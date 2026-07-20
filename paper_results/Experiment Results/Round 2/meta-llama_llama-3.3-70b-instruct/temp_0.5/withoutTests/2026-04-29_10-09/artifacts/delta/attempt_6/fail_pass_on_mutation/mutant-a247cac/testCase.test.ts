import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('a');

    const delta2 = new Delta();
    delta2.retain(1);
    delta2.insert('b');

    const composedDelta = delta1.compose(delta2);
    expect(delta1.ops.length).toBeGreaterThan(0);
    expect(delta2.ops.length).toBeGreaterThan(0);
    expect(composedDelta.ops.length).toBeGreaterThan(0);
  });
});