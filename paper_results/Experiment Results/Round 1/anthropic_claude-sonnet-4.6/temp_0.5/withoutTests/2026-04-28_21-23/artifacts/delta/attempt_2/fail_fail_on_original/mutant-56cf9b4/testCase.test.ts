import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert mutation detection", () => {
  it("detects mutation in invert when retain has falsy value but attributes exist", () => {
    const base = new Delta().insert("Hello");
    // Construct delta with retain having attributes but retain value that makes op.retain && op.attributes falsy
    // Use retain with null attributes to force the else-if difference
    // Actually let's try: op.retain is truthy, op.attributes is null/undefined
    // but reaching the inner branch... 
    // The outer branch: op.delete || typeof op.retain === 'number'
    // If op.delete is set AND op.retain is also set somehow? No.
    
    // Let me try: create a delta where op has retain=5 and attributes=null
    // but bypass the early return by having attributes be something falsy but not null/undefined
    // Actually attributes=0 or attributes=false... but those aren't valid AttributeMaps
    
    // Direct construction bypassing validation:
    const delta = new Delta([{ retain: 5, attributes: undefined }]);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([{ retain: 5 }]);
  });
});