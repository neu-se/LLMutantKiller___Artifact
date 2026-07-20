import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose deltas correctly when the first delta has an insert operation and other delta has a retain operation', () => {
    const delta1 = new Delta([{ insert: 'Hello', attributes: { bold: true } }, { retain: 1, attributes: { italic: true } }]);
    const delta2 = new Delta([{ retain: 5, attributes: { underline: true } }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].attributes).toEqual({ bold: true, underline: true });
    expect(composedDelta.ops[1].attributes).toEqual({ italic: true, underline: true });
  });
});