import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('a');

    const delta2 = new Delta();
    delta2.retain(1000);

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[composedDelta.ops.length - 1].retain).toBe(1000);
  });
});