import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when retaining a null embed', () => {
    const delta = new Delta();
    expect(() => {
      delta.retain({ type: 'embed', data: null }, null);
    }).toThrow('cannot retain a object');
  });
});