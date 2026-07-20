import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should create a new Delta instance', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});