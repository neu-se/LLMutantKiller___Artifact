import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is null', () => {
    const a = { embed: 1 };
    const b = null;
    expect(() => {
      const delta = new Delta().insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrow('cannot retain a object');
  });
});