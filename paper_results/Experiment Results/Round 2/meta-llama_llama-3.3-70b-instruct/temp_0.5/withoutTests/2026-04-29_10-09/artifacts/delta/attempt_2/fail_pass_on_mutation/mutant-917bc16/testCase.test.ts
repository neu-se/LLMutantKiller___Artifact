import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, world!');
    const delta2 = new Delta();
    delta2.retain(13);
    const composed = delta1.compose(delta2);
    expect(composed.length()).toBe(13);
  });
});