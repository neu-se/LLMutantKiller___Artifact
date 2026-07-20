import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return a delta with no operations when diffing a delta with itself', () => {
    const delta = new Delta().insert('Hello, World!');
    expect(delta.diff(delta)).toEqual(new Delta());
  });
});