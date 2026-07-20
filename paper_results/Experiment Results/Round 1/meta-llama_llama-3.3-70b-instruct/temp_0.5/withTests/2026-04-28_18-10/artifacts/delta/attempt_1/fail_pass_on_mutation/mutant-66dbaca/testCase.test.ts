import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export Delta', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});