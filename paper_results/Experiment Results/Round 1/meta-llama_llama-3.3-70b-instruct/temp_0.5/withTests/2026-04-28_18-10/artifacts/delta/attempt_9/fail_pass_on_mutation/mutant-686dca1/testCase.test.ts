import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should create a new Delta instance with the correct constructor', () => {
    const delta = new Delta();
    expect(delta.constructor.name).toBe('Delta');
  });
});