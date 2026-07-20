import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain-embed with retain-embed roundtrip', () => {
  it('composing retain-embed ops produces correct result that satisfies compose identity', () => {
    Delta.registerEmbed('myembed', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => {
        // Simple compose: merge objects
        return Object.assign({}, a as object, b as object);
      },
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
    });

    try {
      // Use a document with a retain-embed followed by more content
      // so the op type difference (retain vs insert) affects subsequent ops
      const base = new Delta()
        .insert({ myembed: { x: 1 } })
        .insert('hello');

      const change1 = new Delta().retain({ myembed: { y: 2 } }).retain(5);
      const change2 = new Delta().retain({ myembed: { z: 3 } }).retain(5);

      const composed = change1.compose(change2);

      // Apply composed to base - if composed has insert instead of retain,
      // the document will be wrong
      const result = base.compose(composed);
      const expected = base.compose(change1).compose(change2);

      expect(result.ops).toEqual(expected.ops);
    } finally {
      Delta.unregisterEmbed('myembed');
    }
  });
});