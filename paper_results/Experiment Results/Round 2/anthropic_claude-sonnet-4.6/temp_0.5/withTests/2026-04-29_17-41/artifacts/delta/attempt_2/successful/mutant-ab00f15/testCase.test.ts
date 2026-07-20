import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("retain()", () => {
  it("should add a retain op when given an empty array as length (non-number that coerces to 0)", () => {
    // Original: `typeof length === 'number' && length <= 0`
    // For []: typeof [] === 'number' is false -> condition false -> proceeds to push { retain: [] }
    //
    // Mutant: `true && length <= 0`
    // For []: [] <= 0 -> 0 <= 0 -> true -> returns early, no op added!
    const delta = new Delta().retain([] as any);
    expect(delta.ops).toHaveLength(1);
  });
});