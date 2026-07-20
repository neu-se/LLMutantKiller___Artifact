import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose two deltas correctly', () => {
    const delta1 = new Delta().insert('Hello');
    const delta2 = new Delta().retain(5).insert(' World');
    const expected = new Delta().insert('Hello World');
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});