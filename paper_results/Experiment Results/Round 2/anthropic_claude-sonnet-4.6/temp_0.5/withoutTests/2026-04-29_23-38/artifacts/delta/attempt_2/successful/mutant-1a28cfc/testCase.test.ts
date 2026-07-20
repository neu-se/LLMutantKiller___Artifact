import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData', () => {
  it('should throw "cannot retain a object" when b is null', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: (a: unknown, b: unknown, priority: boolean) => ({}),
    });

    const delta = new Delta().retain({ image: { src: 'test.png' } });
    const base = new Delta([{ insert: null as any }]);

    expect(() => delta.invert(base)).toThrow('cannot retain a object');

    Delta.unregisterEmbed('image');
  });
});