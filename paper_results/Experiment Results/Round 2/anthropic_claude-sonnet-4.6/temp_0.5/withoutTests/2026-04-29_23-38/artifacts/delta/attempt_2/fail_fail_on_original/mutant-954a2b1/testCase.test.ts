import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should correctly compose when other starts with a retain with attributes', () => {
    // this has inserts
    const delta1 = new Delta().insert('Hello').insert(' World');
    // other starts with a retain WITH attributes (not null attributes)
    // Original: skips optimization block (attributes != null)
    // Mutated: enters optimization block (firstOther != null is true)
    const delta2 = new Delta().retain(5, { bold: true }).insert('!');
    
    const result = delta1.compose(delta2);
    // Expected: bold 'Hello', then ' World', then '!'
    expect(result.ops).toEqual([
      { insert: 'Hello', attributes: { bold: true } },
      { insert: '!' },
      { insert: ' World' },
    ]);
  });
});