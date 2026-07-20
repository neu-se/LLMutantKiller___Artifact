import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('does not call embed handler when thisData is a number', () => {
    Delta.registerEmbed<any>('delta', {
      compose: () => { throw new Error('should not be called'); },
      transform: () => { throw new Error('should not be called'); },
      invert: () => { throw new Error('should not be called'); },
    });

    try {
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      // Should not throw - handler should not be called for numeric retain
      expect(() => a.transform(b, true)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});