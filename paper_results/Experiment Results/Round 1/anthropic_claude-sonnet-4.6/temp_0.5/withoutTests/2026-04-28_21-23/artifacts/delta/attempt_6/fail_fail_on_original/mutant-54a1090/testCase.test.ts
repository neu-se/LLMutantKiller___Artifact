import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose insert-then-retain with plain retain when using optimization path', () => {
    // this: insert('A'), retain(1) - represents a document with 'A' + 1 retained char
    // other: retain(2) - plain retain covering both
    // The optimization: thisIter has insert 'A' (length 1 <= firstLeft=2), push otherIter.next(1)
    const a = new Delta().insert('A').retain(1);
    const b = new Delta().retain(1).insert('B');
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('AB').retain(1));
  });
});