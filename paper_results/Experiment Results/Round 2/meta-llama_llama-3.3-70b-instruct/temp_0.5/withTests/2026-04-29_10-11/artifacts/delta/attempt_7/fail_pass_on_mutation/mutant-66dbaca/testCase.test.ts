import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to create an instance', () => {
    const delta = new Delta();
    expect(delta).toBeDefined();
  });
});