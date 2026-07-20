import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ');
    delta1.retain(1);

    const delta2 = new Delta();
    delta2.retain(7);
    delta2.insert('world!');

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.length()).toBe(13);
  });
});