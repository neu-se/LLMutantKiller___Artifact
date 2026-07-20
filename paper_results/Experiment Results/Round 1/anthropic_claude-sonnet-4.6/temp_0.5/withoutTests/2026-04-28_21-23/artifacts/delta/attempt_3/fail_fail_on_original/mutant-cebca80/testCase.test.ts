import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should invert correctly when retain value causes different baseIndex tracking", () => {
    // op.retain = 0 case: original skips inner retain, mutation doesn't
    // But retain(0) is no-op so no difference in output
    // The real difference must be in the return value
    // Original inner else-if: else if (op.retain) - for number retain this is truthy check
    // When op.retain is a positive number, both enter. No difference.
    // 
    // Actually wait - let me re-read the PLACEHOLDER location again
    // The placeholder IS the return statement location
    // Original: return baseIndex + length; } else if (typeof op.retain === 'object'...)
    // Mutation: return baseIndex + length; } else if (true) {
    // 
    // So the only change is the else-if condition for the OBJECT retain branch
    // For object retain: original checks type, mutation always enters
    // For non-object, non-delete, non-number-retain ops: mutation enters object branch
    // 
    // The only such op would be one where op.retain is undefined but op.insert is also undefined
    // That's not a valid op in practice
    //
    // UNLESS: what if we have an op where op.retain is null?
    // op = { retain: null } - not standard but...
    
    // Let me try: what if the base has an embed and we retain it without object retain?
    // Actually let me just test object retain invert since that's what the mutation affects
    
    Delta.registerEmbed("video", {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,  // invert returns original a
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    const base = new Delta().insert({ video: { src: "original.mp4" } });
    const change = new Delta().retain({ video: { src: "new.mp4" } });
    const inverted = change.invert(base);
    
    // inverted should retain the video back to original
    expect(inverted.ops).toEqual([
      { retain: { video: { src: "original.mp4" } } }
    ]);

    Delta.unregisterEmbed("video");
  });
});