import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('getEmbedTypeAndData validation', () => {
  it('should throw error when b is not an object', () => {
    const a = { embed: 1 };
    const b = 123;
    expect(() => {
      const delta = new Delta().insert(a);
      delta.compose(new Delta().retain(b as any));
    }).toThrow('cannot retain a number');
  });
});