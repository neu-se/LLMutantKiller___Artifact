import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not invoke embed handler when other op is a number retain', () => {
    const mockTransform = jest.fn((_a: unknown, b: unknown) => b);
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: mockTransform,
    });

    // thisOp: embed retain, otherOp: number retain
    // The handler should NOT be called since otherData is not an embed
    const thisDelta = new Delta().retain({ image: { id: 1 } });
    const otherDelta = new Delta().retain(1);

    thisDelta.transform(otherDelta, false);
    
    expect(mockTransform).not.toHaveBeenCalled();

    Delta.unregisterEmbed('image');
  });
});