import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is null', () => {
    const a = { embed: 1 };
    const b = null;
    expect(() => {
      const delta = new Delta();
      delta.insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrowError('cannot retain a object');
  });
});