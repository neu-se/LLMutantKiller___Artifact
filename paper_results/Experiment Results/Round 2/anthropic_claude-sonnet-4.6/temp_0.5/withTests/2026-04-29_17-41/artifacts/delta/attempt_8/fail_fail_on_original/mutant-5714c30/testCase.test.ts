import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not throw when other retain is null but this retain is an object', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any).compose(new Delta(b as any)).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any).transform(new Delta(b as any), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any).invert(new Delta(b as any)).ops,
    });

    try {
      // thisData = { delta: [...] } (object, non-null)
      // otherData = null (typeof null === 'object' but null !== null is false)
      // transformedData = length (since otherData null check fails)
      // Original: true && true && (typeof null==='object') && (null!==null) => true&&true&&true&&false => false
      // Mutated: (typeof {delta:[...]}==='object') || ... => true (short circuit!)
      //   enters block: Object.keys({delta:[...]})[0] = 'delta'
      //   Object.keys(null) throws TypeError!
      const a = new Delta([{ retain: { delta: [{ insert: 'a' }] } }]);
      const b = new Delta([{ retain: null as any }]);
      const result = a.transform(b, false);
      expect(result).toEqual(new Delta());
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});