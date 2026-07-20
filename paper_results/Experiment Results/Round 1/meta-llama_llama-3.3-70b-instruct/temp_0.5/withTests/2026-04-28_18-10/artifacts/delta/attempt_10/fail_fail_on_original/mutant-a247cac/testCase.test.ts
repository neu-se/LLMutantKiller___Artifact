import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should throw an error when accessing out of bounds index in composed delta', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    expect(() => {
      const _ = composed.ops[composed.ops.length + 1];
    }).toThrowError();
  });
});