import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData and otherData are objects', () => {
    const delta1 = new Delta().retain({ image: 'image1' });
    const delta2 = new Delta().retain({ image: 'image2' });
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    };
    Delta.registerEmbed('image', handler);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops).toEqual([
      { retain: { image: 'image2' } },
    ]);
  });
});