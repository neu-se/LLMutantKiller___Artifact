import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("retain() guard condition", () => {
  it("should push a retain op for an object whose numeric coercion is 0, not skip it", () => {
    // The mutation changes:
    //   `typeof length === 'number' && length <= 0`
    // to:
    //   `true && length <= 0`
    //
    // For an object with valueOf() returning 0:
    // - Original: typeof obj === 'number' is false => condition false => op IS pushed
    // - Mutated:  true && (obj <= 0) => true && (0 <= 0) => true => early return, op NOT pushed
    const embedObj: Record<string, unknown> = { image: 'http://example.com' };
    Object.defineProperty(embedObj, 'valueOf', {
      value: () => 0,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    const delta = new Delta().retain(embedObj);
    // Original code: retain op should be pushed since typeof embedObj !== 'number'
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: embedObj });
  });
});