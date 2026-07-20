import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('two embed inserts with no attributes results in 2 ops', () => {
    const delta = new Delta().insert({ embed: 1 }).insert({ embed: 2 });
    expect(delta.ops.length).toEqual(2);
  });
});