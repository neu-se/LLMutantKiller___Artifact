import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called with an extra argument', () => {
    const read = () => {};
    const s1 = (read: any) => read;
    const s2 = (read: any) => read;
    expect(() => pull(read, s1, s2)).not.toThrow();
    const result = pull(read, s1, s2);
    expect(result).toBeInstanceOf(Function);
    expect(() => result()).not.toThrow();
    expect(() => pull(read, s1, s2, undefined)).toThrow();
  });
});