import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should transform embed retains correctly when both ops have same embed type', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        // When priority, keep a; otherwise keep b
        return priority ? a : b;
      },
    });

    const a = new Delta().retain({ image: { src: 'a.png' } });
    const b = new Delta().retain({ image: { src: 'b.png' } });

    // With priority=true, a's value should win
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { image: { src: 'a.png' } } }]);

    // With priority=false, b's value should win  
    const result2 = a.transform(b, false);
    expect(result2.ops).toEqual([{ retain: { image: { src: 'b.png' } } }]);

    Delta.unregisterEmbed('image');
  });
});