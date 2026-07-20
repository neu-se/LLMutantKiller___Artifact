import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with non-document', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    expect(() => delta1.diff(delta2)).toThrowError('diff() called with non-document');
  });
});