import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when retaining a non-object value', () => {
    const delta = new Delta();
    delta.insert('test');

    expect(() => {
      delta.retain('string' as any);
    }).toThrow('cannot retain a string');
  });
});