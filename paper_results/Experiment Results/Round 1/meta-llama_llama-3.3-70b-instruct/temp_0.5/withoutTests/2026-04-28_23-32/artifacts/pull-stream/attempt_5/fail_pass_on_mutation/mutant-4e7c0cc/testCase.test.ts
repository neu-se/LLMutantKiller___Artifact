import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    let callCount = 0;
    const read = () => {};
    const sink1 = (read: any) => {
      callCount++;
      return read;
    };
    const sink2 = (read: any) => {
      callCount++;
      return read;
    };
    const sink3 = (read: any) => {
      callCount++;
      return read;
    };
    const sink4 = (read: any) => {
      callCount++;
      return read;
    };

    pull(read, sink1, sink2, sink3, sink4);
    expect(callCount).toBe(4);
  });
});