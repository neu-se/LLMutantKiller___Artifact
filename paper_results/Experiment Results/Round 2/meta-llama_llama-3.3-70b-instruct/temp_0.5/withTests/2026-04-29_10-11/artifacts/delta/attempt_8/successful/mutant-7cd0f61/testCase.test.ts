import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should throw an error with correct message when called with a different delta', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    let error1: Error | null = null;
    try {
      a.diff(b);
    } catch (e) {
      error1 = e as Error;
    }
    let error2: Error | null = null;
    try {
      b.diff(a);
    } catch (e) {
      error2 = e as Error;
    }
    expect(error1).not.toBeNull();
    expect(error2).not.toBeNull();
    expect(error1?.message).not.toEqual(error2?.message);
  });
});