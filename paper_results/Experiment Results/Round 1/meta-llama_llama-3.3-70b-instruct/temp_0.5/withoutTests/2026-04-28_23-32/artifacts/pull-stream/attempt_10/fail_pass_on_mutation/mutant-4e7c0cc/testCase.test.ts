import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    let callCount = 0;
    const read = () => {};
    const sink1 = () => { callCount++; return () => {}; };
    const sink2 = () => { callCount++; return () => {}; };
    const sink3 = () => { callCount++; return () => {}; };
    const sink4 = () => { callCount++; return () => {}; };

    pull(read, sink1, sink2, sink3, sink4);
    expect(callCount).toBe(4);
  });
});