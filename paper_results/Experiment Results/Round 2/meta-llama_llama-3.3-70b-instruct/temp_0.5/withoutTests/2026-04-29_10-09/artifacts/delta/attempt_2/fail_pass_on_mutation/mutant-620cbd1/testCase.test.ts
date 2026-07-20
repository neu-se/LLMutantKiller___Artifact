import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when composing with a delta that has an empty first operation', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    expect(() => delta1.compose(delta2)).not.toThrow();
  });
});