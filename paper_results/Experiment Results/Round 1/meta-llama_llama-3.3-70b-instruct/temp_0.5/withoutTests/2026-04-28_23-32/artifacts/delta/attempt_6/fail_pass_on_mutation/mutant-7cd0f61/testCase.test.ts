import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return a Delta object when calling diff with two Delta objects', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');
    const delta2 = new Delta();
    delta2.insert('World');
    const result = delta1.diff(delta2);
    expect(result).toBeInstanceOf(Delta);
  });
});