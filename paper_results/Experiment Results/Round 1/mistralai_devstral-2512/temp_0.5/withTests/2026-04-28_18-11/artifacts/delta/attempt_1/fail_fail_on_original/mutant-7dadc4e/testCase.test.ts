import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() with embed objects', () => {
  it('should correctly transform when otherData is null', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: 'value' });
    const b = new Delta().retain(5);
    const result = a.transform(b, true);
    const expected = new Delta().retain(5);

    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});