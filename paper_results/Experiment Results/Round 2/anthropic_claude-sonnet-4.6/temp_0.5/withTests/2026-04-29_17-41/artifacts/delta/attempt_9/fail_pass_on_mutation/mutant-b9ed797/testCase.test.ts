import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('push returns this for chaining after non-mergeable ops with equal attributes', () => {
    const delta = new Delta();
    delta.ops = [{ insert: { embed: 1 } }]; // manually set to avoid push path
    // Now push a retain - isEqual(undefined, undefined) = true, no merge possible
    // If return this is inside if(false), push returns undefined
    const result = delta.push({ retain: 1 });
    expect(result).toBe(delta);
  });
});