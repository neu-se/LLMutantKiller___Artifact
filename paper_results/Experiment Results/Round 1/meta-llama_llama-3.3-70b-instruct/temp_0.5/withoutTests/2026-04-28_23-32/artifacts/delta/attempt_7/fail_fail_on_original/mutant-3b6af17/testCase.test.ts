import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is not an object and otherData is an object', () => {
    const delta1 = new Delta().insert('Hello, ', { bold: true });
    const delta2 = new Delta().retain({ image: 'image1' }, { bold: false });
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => {
        return typeof a === 'object' && typeof b === 'object' ? b : a;
      },
    };
    Delta.registerEmbed('image', handler);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops).toEqual([
      { insert: 'Hello, ', attributes: { bold: true } },
    ]);
  });
});