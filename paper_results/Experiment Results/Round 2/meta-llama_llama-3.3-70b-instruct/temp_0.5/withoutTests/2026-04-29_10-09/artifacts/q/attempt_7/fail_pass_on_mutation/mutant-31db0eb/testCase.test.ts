import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not throw an error when using nextTick with window defined and setImmediate available', () => {
    const originalWindow = global.window;
    global.window = {
      setImmediate: () => {},
    };

    expect(() => Q.nextTick(() => {})).not.toThrowError();

    global.window = originalWindow;
  });
});