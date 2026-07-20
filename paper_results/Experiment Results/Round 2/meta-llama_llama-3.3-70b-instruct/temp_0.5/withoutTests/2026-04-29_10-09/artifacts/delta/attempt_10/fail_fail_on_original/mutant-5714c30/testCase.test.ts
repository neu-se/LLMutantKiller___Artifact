import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, _b, _keepNull) => a,
      invert: (a, _b) => a,
      transform: (a, _b, _priority) => a,
    });

    const delta1 = new Delta();
    delta1.retain({ test: null }, { bold: true });
    delta1.retain({ test: 'bar' }, { italic: true });

    const delta2 = new Delta();
    delta2.retain({ test: null }, { underline: true });
    delta2.retain({ test: 'baz' }, { strike: true });

    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops.length).toBe(2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: null });
    expect(transformedDelta.ops[0].attributes).toEqual({ bold: true, underline: true });
    expect(transformedDelta.ops[1].retain).toEqual({ test: 'bar' });
    expect(transformedDelta.ops[1].attributes).toEqual({ italic: true, strike: true });
  });
});