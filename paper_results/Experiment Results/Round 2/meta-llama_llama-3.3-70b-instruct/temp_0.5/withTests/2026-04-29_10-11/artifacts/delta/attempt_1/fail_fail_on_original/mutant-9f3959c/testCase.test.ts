import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap compose', () => {
  it('exposes the mutation', () => {
    const a: AttributeMap = { key: 'value' };
    const b: AttributeMap = { key: undefined };
    const originalResult = { key: 'value' };
    const mutatedResult = { key: 'value' };

    // The mutation changes the condition in the compose function to always true
    // So, we test the case where the original code would not overwrite the value
    // But the mutated code would
    expect(AttributeMap.compose(a, b)).toEqual(originalResult);
    // To make the test fail with the mutated code, we need to find a case where
    // The original code would not overwrite the value, but the mutated code would
    // In this case, we can use the fact that the mutated code will always overwrite
    // The value, even if it's undefined
    const a2: AttributeMap = { key: undefined };
    const b2: AttributeMap = { key: 'new value' };
    expect(AttributeMap.compose(a2, b2)).toEqual(mutatedResult);
  });
});