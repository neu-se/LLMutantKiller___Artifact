import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('should not invoke embed handler when thisData is a numeric retain', () => {
    // Registering a handler for the string "undefined":
    // On mutated code, Object.keys(number)[0] === undefined (JS value),
    // and JS converts undefined property key to "undefined" string when looking up handlers,
    // so the mutated code finds and calls this handler, changing transformedData
    // from a numeric retain to an object retain {"undefined": undefined}.
    Delta.registerEmbed('undefined', {
      compose: (a: unknown, b: unknown, _keepNull: boolean): unknown => b,
      transform: (a: unknown, b: unknown, _priority: boolean): unknown => b,
      invert: (a: unknown, b: unknown): unknown => b,
    });

    try {
      const a = new Delta().retain(1, { bold: true });
      const b = new Delta().retain(1, { italic: true });
      const result = a.transform(b, false);
      // Original: skips embed block (thisData=1 is not an object), produces numeric retain
      // Mutated: enters embed block, calls handler, transformedData becomes {"undefined": undefined}
      const expected = new Delta().retain(1, { italic: true });
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('undefined');
    }
  });
});