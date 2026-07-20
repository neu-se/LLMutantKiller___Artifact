import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when otherData is not an object', () => {
    const delta1 = new Delta();
    delta1.insert('Hello', { bold: true });
    const delta2 = new Delta();
    delta2.retain(5);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops.length).toBe(1);
    expect(transformedDelta.ops[0].retain).toBe(5);
    expect(transformedDelta.ops[0].attributes).toEqual({ bold: true });
  });
});