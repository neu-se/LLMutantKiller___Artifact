import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform embed mutation', () => {
  it('should correctly transform when thisOp is embed retain and otherOp is number retain with attributes', () => {
    let transformCallCount = 0;

    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => {
        transformCallCount++;
        return { src: 'transformed' };
      },
    });

    try {
      // thisOp retains an embed, otherOp retains a number with attributes (so chop won't remove it)
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      const otherDelta = new Delta().retain(1, { bold: true });

      const result = thisDelta.transform(otherDelta, false);

      // In original: otherData is number, embed block skipped, transformedData = 1
      // retain(1, {bold:true}) is kept
      // In mutated: embed block entered, Object.keys(1)=[], embedType=undefined,
      // no handler match, transformedData stays as 1, same result
      // So both should produce retain(1, {bold:true})
      expect(result.ops).toEqual([{ retain: 1, attributes: { bold: true } }]);
      expect(transformCallCount).toBe(0);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});