import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly', () => {
    const delta1 = new Delta();
    delta1.retain({ foo: 'bar' }, { bold: true });
    delta1.retain({ foo: 'baz' }, { italic: true });

    const delta2 = new Delta();
    delta2.retain({ foo: 'bar' }, { underline: true });
    delta2.retain({ foo: 'qux' }, { strike: true });

    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops.length).toBe(2);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: 'bar' });
    expect(transformedDelta.ops[0].attributes).toEqual({ bold: true, underline: true });
    expect(transformedDelta.ops[1].retain).toEqual({ foo: 'baz' });
    expect(transformedDelta.ops[1].attributes).toEqual({ italic: true, strike: true });
  });
});