import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('retain()', () => {
  it('retain with object length does not return early', () => {
    const delta = new Delta().retain({ embed: 1 }).delete(1);
    expect(delta.ops[0]).toEqual({ retain: { embed: 1 } });
  });
});