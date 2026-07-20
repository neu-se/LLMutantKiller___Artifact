import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should compose correctly when retain is null', () => {
    const delta1 = new Delta();
    delta1.insert({ img: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ img: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    if (composedDelta.ops[0].retain) {
      const keys = Object.keys(composedDelta.ops[0].retain);
      expect(keys.length).toBe(1);
      expect(keys[0]).toBe('img');
    }
  });
});