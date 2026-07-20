import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length via Delta.length()', () => {
  it('delta with retain object has correct length', () => {
    // A retain with an object value (embed retain) should count as length 1
    // This tests the branch: typeof op.retain === 'object' && op.retain !== null
    // In original: non-null object retain returns 1
    // In mutated: null retain also returns 1, breaking insert string length calculation
    // We use changeLength() which calls Op.length internally
    const delta = new Delta();
    // Push a raw op with null retain and string insert to test the null path
    delta.ops.push({ retain: null as any, insert: 'hello' });
    expect(delta.length()).toEqual(5);
  });
});