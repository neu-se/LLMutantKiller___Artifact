// Jest test file containing exactly one test case
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData null check for b', () => {
  it('should throw an error when b (insert value) is null during invert', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: (a: unknown, b: unknown, priority: boolean) => ({}),
    });

    // Create a delta with an embed retain
    const delta = new Delta().retain({ image: { src: 'test.png' } });
    // Create a base delta where the insert value is null
    const base = new Delta([{ insert: null as any }]);

    expect(() => {
      delta.invert(base);
    }).toThrow();

    Delta.unregisterEmbed('image');
  });
});