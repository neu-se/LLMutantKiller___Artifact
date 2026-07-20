import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain when thisData is a string embed type', () => {
    Delta.registerEmbed<string>('string', {
      compose: (a, b) => b,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ string: "test" });
    const b = new Delta().retain({ string: "other" });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { string: "other" } }]);

    Delta.unregisterEmbed('string');
  });
});