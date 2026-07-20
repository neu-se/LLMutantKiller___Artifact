import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain with mixed data types', () => {
    Delta.registerEmbed<{ type: string, value: any }>('mixed', {
      compose: (a, b, keepNull) => (keepNull ? a : b),
      transform: (a, b, priority) => {
        if (priority) return a;
        return { type: b.type, value: b.value };
      },
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ mixed: { type: 'number', value: 42 } });
    const b = new Delta().retain({ mixed: { type: 'string', value: 'test' } });
    const expected = new Delta().retain({ mixed: { type: 'string', value: 'test' } });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('mixed');
  });
});