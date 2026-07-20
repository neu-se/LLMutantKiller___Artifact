import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should throw an error when trying to access the default export', () => {
    expect(() => {
      const delta = new Delta();
      // @ts-ignore
      delta.default;
    }).toThrowError('Cannot read properties of undefined (reading \'default\')');
  });
});