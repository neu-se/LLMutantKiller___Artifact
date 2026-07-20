import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain with string data', () => {
    Delta.registerEmbed<string>('text', {
      compose: (a, b, keepNull) => (keepNull ? a : b),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ text: 'original' });
    const b = new Delta().retain({ text: 'modified' });
    const expected = new Delta().retain({ text: 'modified' });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('text');
  });
});