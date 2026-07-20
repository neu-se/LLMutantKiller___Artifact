import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embeds', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        const composed = deltaA.compose(deltaB);
        // This is where the mutation would affect behavior
        // With keepNull=true, null attributes should be preserved
        // With keepNull=false, they should be removed
        return composed.ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('composes embeds with attributes correctly', () => {
    // Create a delta with an embed that has attributes
    const a = new Delta().insert(
      { delta: [{ insert: 'a' }] },
      { bold: true, color: 'red' }
    );

    // Create another delta that retains the embed with different attributes
    const b = new Delta().retain(
      { delta: [{ insert: 'b' }] },
      { bold: null, italic: true } // bold should be removed, italic added
    );

    // Expected result: the embed should be composed (b+a) and attributes should be:
    // - bold removed (null)
    // - color kept from original
    // - italic added
    const expected = new Delta().insert(
      { delta: [{ insert: 'ba' }] },
      { color: 'red', italic: true }
    );

    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});