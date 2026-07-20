import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed and numeric retain', () => {
  it('should correctly transform when thisOp has object retain and otherOp has numeric retain', () => {
    // Register a simple embed handler
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => {
        // This should NOT be called when otherData is a number
        throw new Error('transform handler should not be called');
      },
    });

    try {
      // thisOp: retain an embed object { image: { src: 'a.png' } }
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } });
      
      // otherOp: retain a number (length 1)
      const otherDelta = new Delta().retain(1);

      // In original code: thisData is object, otherData is number -> condition false -> no handler call
      // In mutated code: thisData is non-null object -> OR condition true -> tries to call handler -> throws
      const result = thisDelta.transform(otherDelta, false);
      
      // The result should retain 1 (the numeric retain from otherDelta)
      expect(result.ops).toEqual([{ retain: 1 }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});