import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle embed retain transform correctly', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
    });
    
    const a = new Delta().retain({ image: 'url1' });
    const b = new Delta().retain({ image: 'url2' });
    const result = a.transform(b, false);
    
    Delta.unregisterEmbed('image');
    
    expect(result.ops[0].retain).toEqual({ image: 'url2' });
  });
});