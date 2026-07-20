import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('delete of retain-object op is kept when thisOp retain is a non-null object', () => {
    // Register a handler so retain-object ops work
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    try {
      // a has a retain-object op (embed retain), b deletes it
      // Original: thisOp.retain is non-null object => condition true => delete is pushed
      // This should work the same in both original and mutated
      // But we need a case where thisOp.retain IS null to differ...
      // Let's try: a retains an embed object, b deletes 1
      const a = new Delta().retain({ image: 'http://example.com' });
      const b = new Delta().delete(1);
      const result = a.compose(b);
      // The retain-object + delete should result in a delete
      expect(result).toEqual(new Delta().delete(1));
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});