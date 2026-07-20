import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embed retain', () => {
  it('should correctly compose two embed retain operations using retain action', () => {
    // Register a handler for embed type 'image'
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        // Simple compose: merge objects
        return { ...(a as object), ...(b as object) };
      },
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create a delta that retains an embed
    const base = new Delta().insert({ image: { src: 'original.jpg', alt: 'original' } });
    
    // this delta: retain the embed with some modification
    const thisDelta = new Delta().retain({ image: { src: 'modified.jpg' } });
    
    // other delta: retain the embed with another modification
    const otherDelta = new Delta().retain({ image: { alt: 'modified alt' } });
    
    // Compose thisDelta with otherDelta
    const result = thisDelta.compose(otherDelta);
    
    // With original code: action = 'retain', so it accesses thisOp.retain = { image: { src: 'modified.jpg' } }
    // The handler.compose is called with thisData = { src: 'modified.jpg' }, otherData = { alt: 'modified alt' }
    // Result should be a retain with merged embed data
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0].retain).toEqual({ image: { src: 'modified.jpg', alt: 'modified alt' } });
    expect(result.ops[0].insert).toBeUndefined();
    
    Delta.unregisterEmbed('image');
  });
});