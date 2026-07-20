import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly push ops when insert follows retain with same attributes', () => {
    // Create a delta with a retain op
    const delta = new Delta();
    delta.ops = [{ retain: 5 }];
    // Push an insert - attributes differ (retain has none, insert has none too)
    // but types differ so no merge happens
    // index = 1 = ops.length, so original uses push, mutant uses splice
    delta.insert('hello');
    expect(delta.ops).toEqual([{ retain: 5 }, { insert: 'hello' }]);
    expect(delta.ops.length).toBe(2);
  });
});