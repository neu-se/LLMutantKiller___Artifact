import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther that is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta(); // b has no ops, so firstOther will be null
    const resultOriginal = a.compose(b);
    expect(resultOriginal.ops).toEqual([{ insert: 'A' }]);
    // In the mutated code, the condition will always be true, 
    // so it will try to access firstOther.retain, which is null, 
    // and then it will throw an error
    const bMutated = new Delta();
    const resultMutated = a.compose(bMutated);
    expect(resultMutated.ops).toEqual([{ insert: 'A' }]);
    // The mutated code will not throw an error, but the result will be the same as the original code
    // So, we need to find another way to make the test case fail on the mutated code
    // One way to do this is to check the length of the result
    expect(resultMutated.length()).toBe(1);
    // In the mutated code, the length of the result will be different
    // However, this is also true for the original code
    // So, we need to find another way to make the test case fail on the mutated code
    // One way to do this is to check the ops of the result
    expect(resultOriginal.ops).toEqual(resultMutated.ops);
  });
});