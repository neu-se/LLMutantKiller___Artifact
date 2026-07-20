import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization only applies for number retains', () => {
    const a = new Delta().insert('A').insert('B').insert('C').delete(1);
    const b = new Delta();
    // Create a retain with a non-number value that coerces to a number via valueOf
    const customRetain: any = { valueOf: () => 3 };
    (b.ops as any[]).push({ retain: customRetain });
    b.insert('D');
    
    // Original: typeof customRetain !== 'number', block skipped, main loop throws
    //           when trying to compose string 'A' with non-standard retain
    // Mutated: true, block entered, customRetain.valueOf() = 3, loop moves A,B,C,
    //          otherIter.next(3) called, main loop: insert('D'), delete(1), no throw
    expect(() => a.compose(b)).toThrow();
  });
});