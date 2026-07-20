import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap compose', () => {
  it('exposes the mutation', () => {
    const a: AttributeMap = { key: 'value' };
    const b: AttributeMap = { key2: 'value2' };

    // The mutation changes the condition in the compose function to always true
    // So, we test the case where the original code would not overwrite the value
    // But the mutated code would
    expect(AttributeMap.compose(a, b)).toEqual({ key: 'value', key2: 'value2' });
  });
});