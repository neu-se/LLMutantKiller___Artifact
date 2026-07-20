import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('should not invoke embed handler when thisData is a numeric retain', () => {
    Delta.registerEmbed('undefined', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean): unknown => b,
      transform: (_a: unknown, b: unknown, _priority: boolean): unknown => b,
      invert: (_a: unknown, b: unknown): unknown => b,
    });

    try {
      const a = new Delta().retain(1, { bold: true });
      const b = new Delta().retain(1, { italic: true });
      const result = a.transform(b, false);
      const expected = new Delta().retain(1, { italic: true });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});