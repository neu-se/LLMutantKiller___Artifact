import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should use setImmediate when window is defined and setImmediate is available', () => {
    const originalWindow = global.window;
    global.window = {
      setImmediate: jest.fn(),
    };

    Q.nextTick(() => {});

    expect(global.window.setImmediate).toHaveBeenCalledTimes(1);

    global.window = originalWindow;
  });
});