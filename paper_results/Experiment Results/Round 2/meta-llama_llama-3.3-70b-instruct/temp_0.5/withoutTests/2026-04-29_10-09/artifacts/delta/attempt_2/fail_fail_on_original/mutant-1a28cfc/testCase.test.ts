import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle getEmbedTypeAndData function', () => {
    const a = { test: 'test' };
    const b = 'test';
    expect(() => Delta.getEmbedTypeAndData(a as any, b as any)).toThrowError('cannot retain a string');
  });
});