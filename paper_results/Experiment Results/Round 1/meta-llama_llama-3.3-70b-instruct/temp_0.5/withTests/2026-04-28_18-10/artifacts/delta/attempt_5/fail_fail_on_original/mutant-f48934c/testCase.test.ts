import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('insert object with length 0', () => {
    const delta = new Delta();
    const obj = { length: 0 };
    expect(() => delta.insert(obj)).toThrowError('cannot retain a object');
  });
});