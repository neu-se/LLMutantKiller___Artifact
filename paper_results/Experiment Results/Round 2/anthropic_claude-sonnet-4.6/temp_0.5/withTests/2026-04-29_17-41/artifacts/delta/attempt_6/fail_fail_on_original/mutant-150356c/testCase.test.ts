import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization correctly handles retain ops in a', () => {
    // a starts with retain(2) which is NOT an insert
    // b starts with plain retain(2) - triggers optimization path
    // Original: loop condition fails immediately (retain is not insert), processes normally
    // Mutated: loop consumes retain(2), putting it in ops before main loop
    const a = new Delta().retain(2).insert('Hello');
    const b = new Delta().retain(2).insert('X');
    // Actual correct result: retain(2).insert('X').insert('Hello')
    // But retain(2) at end gets chopped... no, retain has no attrs so chop removes it
    // Actually retain(2) has no attributes so it stays since insert follows
    const result = a.compose(b);
    // The result should have insert('X') before insert('Hello'), after retain(2)
    expect(result.ops.length).toEqual(3);
    expect(result.ops[0]).toEqual({ retain: 2 });
    expect(result.ops[1]).toEqual({ insert: 'X' });
    expect(result.ops[2]).toEqual({ insert: 'Hello' });
  });
});