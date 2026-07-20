import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle getEmbedTypeAndData function', () => {
    const a = { test: 'test' };
    const b = null;
    const getEmbedTypeAndData = Delta.getEmbedTypeAndData;
    expect(() => getEmbedTypeAndData(a, b)).toThrowError('cannot retain a object');
  });
});