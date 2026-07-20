import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with mismatched embed types', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ other: 'value2' });

    expect(() => {
      delta1.compose(delta2);
    }).toThrow('embed types not matched: test != other');
  });
});