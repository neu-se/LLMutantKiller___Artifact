import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embed retain', () => {
  it('should correctly compose two deltas with embed retains', () => {
    // Register an embed handler for testing
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        return { ...(a as object), ...(b as object) };
      },
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create a delta that retains an embed (image)
    const delta1 = new Delta().retain({ image: { src: 'original.png' } });
    
    // Create a delta that retains the same embed type with modifications
    const delta2 = new Delta().retain({ image: { alt: 'description' } });
    
    // Compose them
    const result = delta1.compose(delta2);
    
    // The result should have a retain with the composed embed data
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toBeDefined();
    expect(result.ops[0].retain).toEqual({
      image: { src: 'original.png', alt: 'description' }
    });
    expect(result.ops[0][''] ).toBeUndefined();
    
    Delta.unregisterEmbed('image');
  });
});