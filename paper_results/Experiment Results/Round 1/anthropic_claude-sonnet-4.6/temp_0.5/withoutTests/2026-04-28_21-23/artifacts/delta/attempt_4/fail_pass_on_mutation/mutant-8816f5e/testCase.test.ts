import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not call embed handler transform when thisOp is embed retain but otherOp is numeric retain', () => {
    const transformCalls: number[] = [];
    
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCalls.push(1);
        return b;
      },
    });

    try {
      // thisDelta retains an image embed (length 1)
      // otherDelta retains 1 (number)
      const thisDelta = new Delta().retain({ image: 'a' }).insert('x');
      const otherDelta = new Delta().retain(1).insert('y');

      thisDelta.transform(otherDelta, false);
      
      // The embed handler should NOT be called since otherData is a number, not an embed
      expect(transformCalls).toHaveLength(0);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});