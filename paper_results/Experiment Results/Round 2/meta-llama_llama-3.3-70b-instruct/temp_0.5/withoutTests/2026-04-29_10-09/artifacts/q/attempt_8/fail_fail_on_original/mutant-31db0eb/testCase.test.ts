import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should use setTimeout when setImmediate is not available', () => {
    const originalSetImmediate = global.setImmediate;
    delete global.setImmediate;

    const originalSetTimeout = global.setTimeout;
    const setTimeoutSpy = jest.fn();
    global.setTimeout = setTimeoutSpy;

    Q.nextTick(() => {});

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

    global.setImmediate = originalSetImmediate;
    global.setTimeout = originalSetTimeout;
  });
});