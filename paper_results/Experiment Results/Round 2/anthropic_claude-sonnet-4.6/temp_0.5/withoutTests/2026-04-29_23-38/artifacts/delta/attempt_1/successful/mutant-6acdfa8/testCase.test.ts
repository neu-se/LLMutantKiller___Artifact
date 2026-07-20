import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta retain method', () => {
  it('should not add attributes to retain op when attributes is a non-object (e.g., a string)', () => {
    const delta = new Delta();
    // In the original, typeof 'string' === 'object' is false, so attributes won't be set
    // In the mutated version, true && is always true, so attributes would be set
    (delta as any).retain(5, 'notAnObject');
    expect(delta.ops).toHaveLength(1);
    expect(delta.ops[0]).toEqual({ retain: 5 });
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});