import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with non-object embed', () => {
    const delta1 = new Delta([{ insert: { type: 'embed', data: 'test' } }]);
    const delta2 = new Delta([{ retain: 'invalid' }]);
    expect(() => {
      delta1.compose(delta2);
    }).toThrow('cannot retain a string');
  });
});