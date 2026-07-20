import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    const read = () => {};
    const sink1 = (read: any) => read;
    const sink2 = (read: any) => read;
    const sink3 = (read: any) => read;
    const sink4 = (read: any) => read;

    const result = pull(read, sink1, sink2, sink3, sink4);
    expect(result).toBe(read);
  });
});