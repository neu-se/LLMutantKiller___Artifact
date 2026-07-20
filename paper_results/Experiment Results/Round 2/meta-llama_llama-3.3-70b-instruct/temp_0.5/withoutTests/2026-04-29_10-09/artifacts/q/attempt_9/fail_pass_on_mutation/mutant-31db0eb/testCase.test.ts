import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not use global.setImmediate when window is defined and setImmediate is available', () => {
    const originalWindow = global.window;
    global.window = {
      setImmediate: jest.fn(),
    };

    const originalSetImmediate = global.setImmediate;
    global.setImmediate = jest.fn();

    Q.nextTick(() => {});

    expect(global.setImmediate).not.toHaveBeenCalled();

    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;
  });
});