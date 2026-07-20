import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with attributes check', () => {
    const delta = new Delta().retain(1, { bold: true, color: null });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true } });
  });
});