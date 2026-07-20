import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    const delta2 = new Delta();
    delta2.retain(7);
    const composed = delta1.compose(delta2);
    const rest = new Delta(delta1.ops.slice());
    rest = rest.compose(delta2);
    expect(rest.length()).toBe(7);
    expect(composed.length()).toBe(7);
    expect(composed.ops.length).toBe(1);
  });
});