import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should compose correctly when retain is null', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    const delta2 = new Delta();
    delta2.insert('world!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].insert).toBe('Hello, world!');
  });
});