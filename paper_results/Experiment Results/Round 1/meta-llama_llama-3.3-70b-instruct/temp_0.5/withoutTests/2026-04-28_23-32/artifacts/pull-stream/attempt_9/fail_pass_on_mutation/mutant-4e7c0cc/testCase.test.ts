import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    let callCount = 0;
    const read = () => {};
    const sink1 = () => { callCount++; };
    const sink2 = () => { callCount++; };
    const sink3 = () => { callCount++; };
    const sink4 = () => { callCount++; };

    pull(read, sink1, sink2, sink3, sink4);
    expect(callCount).toBeGreaterThan(3);
  });
});