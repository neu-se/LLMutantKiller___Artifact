import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with non-positive length and then retain with positive length multiple times and check ops', () => {
    const delta = new Delta();
    delta.retain(-1);
    delta.retain(1);
    delta.retain(1);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 2 });
  });
});