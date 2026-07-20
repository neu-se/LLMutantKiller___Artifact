import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly when action is retain', () => {
    const delta1 = new Delta().insert({ image: 'image1' }, { bold: true });
    const delta2 = new Delta().insert({ image: 'image2' }, { italic: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toEqual({ image: expect.any(Function) });
    expect(composedDelta.ops[0].attributes).toEqual({ bold: true, italic: true });
  });
});