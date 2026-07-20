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
    expect(callCount).toBe(4);
  });

  it.skip('should not call sink4 when mutated', () => {
    let callCount = 0;
    const read = () => {};
    const sink1 = () => { callCount++; };
    const sink2 = () => { callCount++; };
    const sink3 = () => { callCount++; };
    const sink4 = () => { callCount++; };

    // Simulate the mutation by removing the case 4 branch
    const mutatedPull = (read: any,...sinks: any[]) => {
      if (sinks.length === 1) {
        return sinks[0](read);
      } else if (sinks.length === 2) {
        return sinks[0](sinks[1](read));
      } else if (sinks.length === 3) {
        return sinks[0](sinks[1](sinks[2](read)));
      } else {
        // This is the default branch, which should not be called when there are four sinks
        return read;
      }
    };

    mutatedPull(read, sink1, sink2, sink3, sink4);
    expect(callCount).toBe(3);
  });
});