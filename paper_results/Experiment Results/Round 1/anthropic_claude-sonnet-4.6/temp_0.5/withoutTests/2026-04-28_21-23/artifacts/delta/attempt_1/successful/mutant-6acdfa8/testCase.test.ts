import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta retain with non-object attributes', () => {
  it('should not set attributes when attributes is a string (non-object)', () => {
    const delta = new Delta();
    // Pass a string as attributes - original checks typeof === 'object' so it won't set it
    // Mutated version skips that check, and Object.keys("abc") returns ["0","1","2"] with length > 0
    delta.retain(5, "bold" as any);
    // In original: attributes is a string, typeof "bold" !== 'object', so no attributes set
    // In mutated: true && Object.keys("bold").length > 0 => true, so attributes = "bold"
    expect(delta.ops).toEqual([{ retain: 5 }]);
  });
});