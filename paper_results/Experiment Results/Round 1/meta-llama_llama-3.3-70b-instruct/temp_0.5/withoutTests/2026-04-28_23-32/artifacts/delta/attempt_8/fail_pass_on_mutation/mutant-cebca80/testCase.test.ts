import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Hello, World!');
    const delta = new Delta();
    delta.retain({ image: 'image1' });
    expect(() => delta.invert(baseDelta)).toThrowError('cannot retain a string');
  });
});