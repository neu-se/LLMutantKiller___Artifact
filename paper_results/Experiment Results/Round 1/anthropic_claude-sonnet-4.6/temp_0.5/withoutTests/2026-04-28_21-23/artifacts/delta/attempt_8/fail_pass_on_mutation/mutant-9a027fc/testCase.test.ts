import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms with priority and embed retain', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });
    try {
      const a = new Delta().retain({ image: { id: 1 } });
      const b = new Delta().retain({ image: { id: 2 } });
      const result = a.transform(b, true);
      // With priority=true, handler.transform({id:1}, {id:2}, true) = {id:1}
      expect(result).toEqual(new Delta().retain({ image: { id: 1 } }));
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});