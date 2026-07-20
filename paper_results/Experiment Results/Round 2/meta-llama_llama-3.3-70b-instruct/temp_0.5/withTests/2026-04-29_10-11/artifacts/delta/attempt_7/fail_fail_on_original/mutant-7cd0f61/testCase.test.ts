import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error with correct message when called with a different delta', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    const error1 = new Error();
    try {
      a.diff(b);
    } catch (e) {
      error1 = e;
    }
    const error2 = new Error();
    try {
      b.diff(a);
    } catch (e) {
      error2 = e;
    }
    expect(error1.message).not.toEqual(error2.message);
  });
});