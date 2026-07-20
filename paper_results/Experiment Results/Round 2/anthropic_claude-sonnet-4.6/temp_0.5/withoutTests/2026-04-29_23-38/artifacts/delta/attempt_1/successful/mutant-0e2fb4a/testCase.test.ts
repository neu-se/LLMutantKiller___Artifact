import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta invert', () => {
  it('should handle retain null without throwing', () => {
    const delta = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    const base = new Delta().insert('hello');
    expect(() => delta.invert(base)).not.toThrow();
  });
});