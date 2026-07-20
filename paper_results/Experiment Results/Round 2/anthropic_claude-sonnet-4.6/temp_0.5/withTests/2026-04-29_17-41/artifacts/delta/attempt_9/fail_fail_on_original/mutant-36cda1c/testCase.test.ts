import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() embed at start followed by string with newline in same op', () => {
  it('correctly handles embed followed by string containing newline in same push', () => {
    const lines: Delta[] = [];
    const allAttrs: Record<string, unknown>[] = [];

    // The key: embed op, then a SINGLE string op containing both text and newline "a\nb"
    // With index=-1 for embed: iter.next() consumes embed, added to line
    //   then string op "a\nb": index = indexOf('\n',0)-0 = 1, iter.next(1) takes "a"
    //   then "\n" seen at index=0, line ["embed","a"] emitted
    //   then "b" added to new line, no more newlines, final predicate call
    // With index=+1 for embed: iter.next(1) consumes embed, added to line  
    //   SAME result since embed length=1
    // These are still equivalent...

    // Let me try: what if we check that iter.next() vs iter.next(1) 
    // differ when called on a string op that has length > 1?
    // The mutation only applies to non-string inserts though.
    
    // Final attempt: test with object insert that somehow has different behavior
    // Actually let me just verify the number of predicate calls differs
    
    const delta = new Delta()
      .insert({ image: 'a.png' })
      .insert('text\nnewline')
      .insert('\n');

    delta.eachLine((line, attrs, idx) => {
      lines.push(line);
      allAttrs.push(attrs);
    });

    expect(lines.length).toBe(3);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'a.png' } },
      { insert: 'text' },
    ]);
    expect(lines[1].ops).toEqual([{ insert: 'newline' }]);
    expect(lines[2].ops).toEqual([]);
  });
});