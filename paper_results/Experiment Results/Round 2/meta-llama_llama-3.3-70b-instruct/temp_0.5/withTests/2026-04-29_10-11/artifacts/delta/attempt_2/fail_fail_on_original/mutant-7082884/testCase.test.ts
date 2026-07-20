import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return a delta with the correct operations when diffing two different deltas', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, Quill!');
    const expected = new Delta().retain(7).delete(6).insert('Quill');
    expect(delta1.diff(delta2)).toEqual(expected);
  });
});