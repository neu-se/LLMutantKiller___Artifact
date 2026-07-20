import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with the correct number of arguments', () => {
    const read = () => {};
    const s1 = (read: any) => read;
    const s2 = (read: any) => read;
    expect(() => pull(read, s1, s2)).not.toThrow();
    const result = pull(read, s1, s2);
    expect(result).toBeInstanceOf(Function);
    expect(() => result()).not.toThrow();
    const args = [read, s1, s2];
    expect(() => pull(...args)).not.toThrow();
    const s3 = () => { throw new Error('Test error'); };
    expect(() => pull(read, s1, s2, s3)).toThrow();
    expect(() => pull(read, s1, s2, undefined)).not.toThrow();
  });
});