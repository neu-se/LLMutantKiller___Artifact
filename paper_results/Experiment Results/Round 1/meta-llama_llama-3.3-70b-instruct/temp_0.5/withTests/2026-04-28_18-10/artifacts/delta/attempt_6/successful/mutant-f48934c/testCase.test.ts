import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('insert object with length 0', () => {
    const delta = new Delta();
    const obj = { length: 0 };
    delta.insert(obj);
    expect(delta.ops.length).toBe(1);
  });
});