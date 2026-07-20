import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('correctly inverts embed retain and ignores invalid ops', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });
    
    try {
      const base = new Delta().insert({ image: 'original.png' });
      // Delta with embed retain followed by an invalid op
      const change = new Delta();
      change.ops = [
        { retain: { image: 'modified.png' } },
        {} as any  // invalid op with no retain/insert/delete
      ];
      
      // Original: processes embed retain correctly, ignores invalid op
      // Mutated: processes embed retain correctly, then throws for invalid op
      const inverted = change.invert(base);
      
      expect(inverted.ops).toEqual([{ retain: { image: 'original.png' } }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});