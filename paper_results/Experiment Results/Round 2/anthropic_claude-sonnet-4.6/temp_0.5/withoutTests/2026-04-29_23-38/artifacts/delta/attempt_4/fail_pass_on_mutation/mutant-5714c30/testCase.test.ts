import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform embed retain against number retain without calling handler', () => {
    const transformSpy = jest.fn((a: unknown, b: unknown) => b);
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: transformSpy,
    });

    // thisOp has object retain (embed), otherOp has number retain
    const thisDelta = new Delta().retain({ image: { id: 1 } });
    const otherDelta = new Delta().retain(1);

    const result = thisDelta.transform(otherDelta, false);
    
    // The handler should NOT be called since otherData is a number, not an embed
    expect(transformSpy).not.toHaveBeenCalled();
    // Result should be retain(1) which gets chopped to []
    expect(result.ops).toEqual([]);

    Delta.unregisterEmbed('image');
  });
});