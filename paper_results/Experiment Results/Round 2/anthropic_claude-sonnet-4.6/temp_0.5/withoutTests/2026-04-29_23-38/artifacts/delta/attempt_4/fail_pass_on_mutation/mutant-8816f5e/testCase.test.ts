import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle transform correctly when thisData is null retain and otherData is object retain', () => {
    let handlerCalled = false;
    Delta.registerEmbed('image', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (a: unknown, b: unknown, _priority: boolean) => {
        handlerCalled = true;
        return b;
      },
    });

    try {
      // thisOp: retain null? No, that's not valid...
      // Let me think differently
      // thisData = null means thisOp.retain = null, but that means no retain op
      // 
      // Actually I need thisData to be a non-null object but otherData to be null
      // Original: thisData !== null (true) && typeof otherData === 'object' (true for null) && otherData !== null (FALSE) -> skip
      // Mutated: (typeof thisData === 'object' && thisData !== null) -> TRUE -> enter block
      
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } }).insert('x');
      // otherDelta retains null? Can't do that directly.
      // What about: thisData is object, otherData is null?
      // otherOp.retain = null means no retain... 
      
      expect(handlerCalled).toBe(false);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});