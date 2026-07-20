import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should throw an error when composing with a delta that has an out of bounds index', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const delta = a.compose(b);
    expect(() => {
      delta.ops[delta.ops.length + 1];
    }).toThrowError();
  });
});