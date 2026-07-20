import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should return the correct result when one Delta is a subset of the other', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!').insert(' Foo');
    const result = delta1.diff(delta2);
    expect(result.ops).not.toEqual(delta1.ops);
  });
});