import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain when thisData is a boolean embed type', () => {
    Delta.registerEmbed<boolean>('boolean', {
      compose: (a, b) => b,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ boolean: true });
    const b = new Delta().retain({ boolean: false });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { boolean: false } }]);

    Delta.unregisterEmbed('boolean');
  });
});