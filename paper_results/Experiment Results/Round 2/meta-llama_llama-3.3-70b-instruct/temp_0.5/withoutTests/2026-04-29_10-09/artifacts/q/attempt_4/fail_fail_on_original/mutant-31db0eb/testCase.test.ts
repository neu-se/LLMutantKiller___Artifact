import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should use setTimeout when window is not defined', () => {
    const originalWindow = global.window;
    delete global.window;

    const originalSetTimeout = global.setTimeout;
    const setTimeoutSpy = jest.fn();
    global.setTimeout = setTimeoutSpy;

    Q.nextTick(() => {});

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

    global.window = originalWindow;
    global.setTimeout = originalSetTimeout;
  });
});