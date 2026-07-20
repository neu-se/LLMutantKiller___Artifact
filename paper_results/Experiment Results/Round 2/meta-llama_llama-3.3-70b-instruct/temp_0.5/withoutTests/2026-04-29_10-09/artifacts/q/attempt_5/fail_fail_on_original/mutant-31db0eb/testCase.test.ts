import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should throw an error when using nextTick with window defined but setImmediate not available', () => {
    const originalWindow = global.window;
    global.window = {};

    const originalSetImmediate = global.setImmediate;
    delete global.setImmediate;

    expect(() => Q.nextTick(() => {})).toThrowError();

    global.window = originalWindow;
    global.setImmediate = originalSetImmediate;
  });
});