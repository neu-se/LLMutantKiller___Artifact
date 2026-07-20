import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain when thisData is a number embed type', () => {
    Delta.registerEmbed<number>('number', {
      compose: (a, b) => b,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ number: 123 });
    const b = new Delta().retain({ number: 456 });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ retain: { number: 456 } }]);

    Delta.unregisterEmbed('number');
  });
});