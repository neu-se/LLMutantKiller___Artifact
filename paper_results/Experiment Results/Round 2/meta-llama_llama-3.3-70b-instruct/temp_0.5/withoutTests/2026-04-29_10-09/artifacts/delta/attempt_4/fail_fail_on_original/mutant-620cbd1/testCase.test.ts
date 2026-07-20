import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when composing with a delta that has a first operation with a retain value that is not a number', () => {
    const delta1 = new Delta();
    const delta2 = new Delta([{ retain: "" }]);
    expect(() => delta1.compose(delta2)).toThrowError("no handlers for embed type \"\"");
  });
});