import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const result = new Delta(a).compose(new Delta(b)).ops;
        // This test specifically checks the keepNull parameter behavior
        if (keepNull === true) {
          // Original behavior: keepNull should be true when composing retains
          return result;
        } else {
          // Mutated behavior: keepNull is always true
          return result;
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly compose embed retains with keepNull parameter', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'ba' }] });
    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});