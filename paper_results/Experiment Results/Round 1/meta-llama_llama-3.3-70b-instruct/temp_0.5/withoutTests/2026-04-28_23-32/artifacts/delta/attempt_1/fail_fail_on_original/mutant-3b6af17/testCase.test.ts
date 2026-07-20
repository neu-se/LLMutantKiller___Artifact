import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is not an object and otherData is an object', () => {
    const delta1 = new Delta().insert('Hello, ', { bold: true });
    const delta2 = new Delta().retain('World!', { bold: false });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops).toEqual([
      { insert: 'Hello, ', attributes: { bold: true } },
      { retain: 'World!', attributes: { bold: false } },
    ]);
  });
});