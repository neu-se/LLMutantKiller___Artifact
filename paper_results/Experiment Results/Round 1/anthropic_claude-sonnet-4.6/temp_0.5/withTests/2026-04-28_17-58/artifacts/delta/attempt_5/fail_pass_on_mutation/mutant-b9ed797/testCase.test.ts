import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('consecutive embed inserts with matching attributes do not merge but both get added', () => {
    const delta = new Delta();
    delta.push({ insert: { embed: 1 }, attributes: { alt: 'test' } });
    delta.push({ insert: { embed: 2 }, attributes: { alt: 'test' } });
    // attributes match but embeds don't merge as strings/retains
    // original: falls through to push -> 2 ops
    // mutant: if(false) never executes -> second op never added -> 1 op
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: { embed: 1 }, attributes: { alt: 'test' } });
    expect(delta.ops[1]).toEqual({ insert: { embed: 2 }, attributes: { alt: 'test' } });
  });
});