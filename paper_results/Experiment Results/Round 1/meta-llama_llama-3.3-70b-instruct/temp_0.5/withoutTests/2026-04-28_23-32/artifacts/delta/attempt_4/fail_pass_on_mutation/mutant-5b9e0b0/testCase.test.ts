import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should compose correctly when retain is null', () => {
    const delta1 = new Delta();
    delta1.insert({ img: 'image1' }, { width: 100 });
    const delta2 = new Delta();
    delta2.insert({ img: 'image2' }, { width: 200 });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBeGreaterThan(0);
    if (composedDelta.ops[0].retain) {
      expect(Object.keys(composedDelta.ops[0].retain)).toBe('img');
    }
  });
});