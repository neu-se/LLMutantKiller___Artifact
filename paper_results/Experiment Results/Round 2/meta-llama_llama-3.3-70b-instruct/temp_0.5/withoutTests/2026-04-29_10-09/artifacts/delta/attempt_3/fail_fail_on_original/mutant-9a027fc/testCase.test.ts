import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform correctly', () => {
    const delta1 = new Delta();
    delta1.retain(1, { bold: true });
    delta1.retain(1, { italic: true });

    const delta2 = new Delta();
    delta2.retain(1, { bold: true });
    delta2.retain(1, { underline: true });

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toBe(2);
    expect(transformedDelta.ops[0].attributes).toEqual({ bold: true, italic: true });
  });
});