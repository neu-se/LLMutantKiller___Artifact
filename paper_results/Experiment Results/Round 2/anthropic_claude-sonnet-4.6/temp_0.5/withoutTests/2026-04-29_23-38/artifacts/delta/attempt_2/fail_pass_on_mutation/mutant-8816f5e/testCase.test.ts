import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with mixed retain types', () => {
  it('should not invoke embed handler when thisOp retains an embed but otherOp retains a number', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, _b: unknown, _keepNull: boolean) => ({}),
      invert: (_a: unknown, _b: unknown) => ({}),
      transform: (_a: unknown, _b: unknown, _priority: boolean): never => {
        throw new Error('embed transform handler must not be called when otherData is numeric');
      },
    });

    try {
      // thisOp: retain an embed object, then insert something
      const thisDelta = new Delta().retain({ image: { src: 'a.png' } }).insert('x');
      // otherOp: retain 1 (numeric), then insert something to prevent chop
      const otherDelta = new Delta().retain(1).insert('y');

      // Original: thisData is object, otherData is number -> condition false -> no handler call
      // Mutated: thisData is non-null object -> OR true -> tries to call handler -> throws
      const result = thisDelta.transform(otherDelta, false);
      
      // The retain(1) from otherDelta should be preserved, plus the insert 'y'
      expect(result.ops).toEqual([{ retain: 1 }, { insert: 'y' }]);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});