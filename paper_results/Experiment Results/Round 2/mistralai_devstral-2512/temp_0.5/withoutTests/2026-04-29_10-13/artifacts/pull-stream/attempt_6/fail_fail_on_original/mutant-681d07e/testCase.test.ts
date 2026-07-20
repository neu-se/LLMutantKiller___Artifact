import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should trigger the args null check when using a function with length 1', () => {
    const testFn = (read: any) => {
      return (end: any, data: any) => {};
    };
    testFn.length = 1;

    const result = pull(testFn);
    expect(typeof result).toBe('function');
  });
});