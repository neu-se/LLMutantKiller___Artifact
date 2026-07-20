import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when retaining a non-object insert', () => {
    const delta = new Delta();
    delta.insert({ key: 'value' });

    expect(() => {
      delta.retain({ key: 'value' });
    }).toThrow('cannot retain a object');
  });
});