import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should handle op with delete:0 without throwing', () => {
    const base = new Delta().insert('Hello');
    const delta = new Delta([{ delete: 0 }]);
    // Original: branch 3 condition: `0 || false` = false, branch 4: `typeof undefined === 'object'` = false → returns baseIndex (0)
    // Mutated: branch 4: `true && undefined !== null` = true → throws error
    expect(() => delta.invert(base)).not.toThrow();
    expect(delta.invert(base).ops).toEqual([]);
  });
});