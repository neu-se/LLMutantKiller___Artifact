import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with non-positive length', () => {
    const delta = new Delta();
    expect(() => delta.retain(-1)).toThrowError('retain() called with non-positive length');
  });
});