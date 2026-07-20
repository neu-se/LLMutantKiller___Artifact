import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should not throw an error when creating a new Delta instance', () => {
    expect(() => {
      const delta = new Delta();
    }).not.toThrowError();
  });
});