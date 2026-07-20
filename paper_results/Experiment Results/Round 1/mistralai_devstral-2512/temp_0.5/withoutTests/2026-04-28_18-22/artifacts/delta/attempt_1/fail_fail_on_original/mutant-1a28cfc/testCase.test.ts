import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should throw an error when retaining a non-object embed', () => {
    const delta = new Delta();
    expect(() => {
      delta.retain({ type: 'embed' }, null);
    }).toThrow('cannot retain a object');
  });
});