import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform with number retain in thisOp and embed retain in otherOp', () => {
    const transformFn = jest.fn((a: unknown, b: unknown, priority: boolean) => b);
    
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: transformFn,
    });

    // thisOp.retain = 5 (number), otherOp.retain = {image: ...}
    const a = new Delta().retain(5);
    const b = new Delta().retain({ image: { src: 'test.png' } });

    const result = a.transform(b);
    
    // transformFn should NOT be called because thisData is a number, not an embed
    expect(transformFn).not.toHaveBeenCalled();
    // transformedData should be otherData (the embed object)
    expect(result.ops).toEqual([{ retain: { image: { src: 'test.png' } } }]);

    Delta.unregisterEmbed('image');
  });
});