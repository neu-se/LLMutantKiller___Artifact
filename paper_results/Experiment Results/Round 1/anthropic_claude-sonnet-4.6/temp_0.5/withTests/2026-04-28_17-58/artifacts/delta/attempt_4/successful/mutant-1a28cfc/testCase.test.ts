import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData null b check', () => {
  it('throws "cannot retain a object" when b is null, not a generic TypeError', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any).compose(new Delta(b as any)).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any).transform(new Delta(b as any), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any).invert(new Delta(b as any)).ops,
    });

    try {
      // base has an op with insert: null
      // delta retains an embed over it
      // getEmbedTypeAndData is called with b = null
      // Original: typeof null === 'object' but b === null is true, so throws 'cannot retain a object'
      // Mutated: typeof null === 'object' and false is false, so no throw, proceeds to Object.keys(null) => TypeError
      const delta = new Delta().retain({ delta: [{ insert: 'a' }] });
      const base = new Delta([{ insert: null as any }]);

      expect(() => delta.invert(base)).toThrow('cannot retain a object');
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});