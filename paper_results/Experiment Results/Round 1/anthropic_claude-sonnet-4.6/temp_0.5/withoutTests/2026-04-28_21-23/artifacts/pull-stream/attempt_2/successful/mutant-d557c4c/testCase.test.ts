import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('should return the source unchanged when given a non-function non-object argument', () => {
    const source = (end: any, cb: Function) => cb(null, 1);
    const result = pull(source, 42 as any);
    // Original: 42 is not a function and not an object, so read stays as source
    // Mutated: tries to call (42).sink(read) which throws TypeError
    expect(result).toBe(source);
  });
});