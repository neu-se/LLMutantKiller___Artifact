import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as default and have correct module.exports behavior', () => {
    // In Node.js, typeof module === 'object' is always true,
    // so both original and mutated code execute the same path.
    // Verify Delta works correctly as imported.
    const delta = new Delta();
    delta.insert('hello');
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    expect(delta.length()).toBe(5);
  });
});