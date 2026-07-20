import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('retain()', () => {
  it('retain with null creates an op', () => {
    const delta = new Delta().retain(null as any);
    // In original code (typeof length === 'number' && length <= 0):
    //   typeof null === 'number' is false -> don't return early -> push {retain: null}
    //   ops.length = 1
    // In mutated code (true && length <= 0):
    //   true && null <= 0 = true -> return early -> no op
    //   ops.length = 0
    expect(delta.ops.length).toBe(1);
  });
});