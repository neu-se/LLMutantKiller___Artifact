import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('appends embed insert after string insert with different attributes', () => {
    // insert({embed:1}) after insert('a', {bold:true})
    // lastOp IS an object, attributes don't match (object vs {bold:true}), no merge
    // Original: reaches if(index===ops.length) -> push -> 2 ops
    // Mutated: if(false) wraps the push/splice -> op dropped -> 1 op
    const delta = new Delta()
      .insert('a', { bold: true })
      .insert({ embed: 1 }, { alt: 'image' });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[1]).toEqual({ insert: { embed: 1 }, attributes: { alt: 'image' } });
  });
});