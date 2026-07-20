import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embed retain', () => {
  it('should correctly compose two deltas with object retain (embed) operations', () => {
    // Register an embed handler for testing
    Delta.registerEmbed('image', {
      compose(a: unknown, b: unknown, keepNull: boolean): unknown {
        const aObj = a as Record<string, unknown>;
        const bObj = b as Record<string, unknown>;
        return { ...aObj, ...bObj };
      },
      invert(a: unknown, b: unknown): unknown {
        return b;
      },
      transform(a: unknown, b: unknown, priority: boolean): unknown {
        return b;
      },
    });

    try {
      // Create a delta that retains an embed (object retain)
      // thisOp.retain is an object (not null), so action should be 'retain'
      const base = new Delta().insert({ image: { src: 'original.png', alt: 'original' } });
      
      // First compose: retain the embed with some modification
      const delta1 = new Delta().retain({ image: { src: 'modified.png' } });
      
      // Second compose: retain the embed with another modification  
      const delta2 = new Delta().retain({ image: { alt: 'modified' } });
      
      // Compose delta1 with delta2 - this should trigger the code path where
      // thisOp.retain is an object (not null), so action = 'retain'
      const result = delta1.compose(delta2);
      
      // The result should have a retain with the composed embed data
      // In original: action = 'retain', so newOp.retain = { image: composed_data }
      // In mutated: action = '', so newOp[''] = { image: composed_data }, and newOp.retain is undefined
      
      expect(result.ops.length).toBeGreaterThan(0);
      expect(result.ops[0].retain).toBeDefined();
      expect(typeof result.ops[0].retain).toBe('object');
      expect(result.ops[0].retain).not.toBeNull();
      
      // The retain should be an object with 'image' key
      const retainOp = result.ops[0].retain as Record<string, unknown>;
      expect(retainOp.image).toBeDefined();
      
      // The composed image data should have both src and alt
      const imageData = retainOp.image as Record<string, unknown>;
      expect(imageData.src).toBe('modified.png');
      expect(imageData.alt).toBe('modified');
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});