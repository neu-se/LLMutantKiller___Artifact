import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle inserts followed by content when other has initial retain covering only part', () => {
    // this: insert 'a', insert 'b'  
    // other: retain 1, insert 'X', retain 1
    // Expected: insert 'a', insert 'X', insert 'b'
    const a = new Delta().insert('a').insert('b');
    const b = new Delta().retain(1).insert('X').retain(1);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('aXb'));
  });
});