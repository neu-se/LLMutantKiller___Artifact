import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw an error with the correct preposition when comparing different delta instances', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ delete: 1 }]);

    let errorMessage = '';
    try {
      delta1.diff(delta2);
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toContain('with');
    expect(errorMessage).not.toContain('on');
  });
});