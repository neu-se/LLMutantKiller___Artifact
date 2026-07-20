import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle short insert in this when other has a longer plain retain at start', () => {
    // this: insert 'Hi' (length 2)
    // other: retain 10 (plain, no attributes) - firstLeft = 10, insert length 2 <= 10
    // The optimization should push otherIter.next() for the insert portion
    const a = new Delta().insert('Hi').retain(5);
    const b = new Delta().retain(7);
    const result = a.compose(b);
    // Should preserve the insert and the retain
    expect(result).toEqual(new Delta().insert('Hi').retain(5));
  });
});