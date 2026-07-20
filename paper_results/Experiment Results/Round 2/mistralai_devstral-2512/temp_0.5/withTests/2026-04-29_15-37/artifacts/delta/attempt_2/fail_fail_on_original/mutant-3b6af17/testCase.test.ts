import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly transform when thisData is a string and otherData is an embed object', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => priority ? a : b,
      invert: (a, b) => b,
    });

    const a = new Delta().insert('test');
    const b = new Delta().retain({ test: 'value' });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: 'value' });

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});