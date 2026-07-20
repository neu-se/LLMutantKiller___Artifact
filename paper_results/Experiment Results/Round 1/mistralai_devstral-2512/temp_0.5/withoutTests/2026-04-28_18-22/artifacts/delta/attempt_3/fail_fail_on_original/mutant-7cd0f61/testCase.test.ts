import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw the correct error message when diff is called with a non-document Delta', () => {
    const delta1 = new Delta([{ retain: 1 }]);
    const delta2 = new Delta([{ insert: 'test' }]);

    expect(() => {
      delta1.diff(delta2);
    }).toThrow('diff() called on non-document');
  });
});