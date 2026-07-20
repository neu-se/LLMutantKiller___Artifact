import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when attempting to retain a non-object', () => {
    expect(() => {
      const delta = new Delta();
      const a = 'test';
      const b = { test: 'test' };
      const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(a as any, b as any);
    }).toThrowError('cannot retain a string');
  });
});