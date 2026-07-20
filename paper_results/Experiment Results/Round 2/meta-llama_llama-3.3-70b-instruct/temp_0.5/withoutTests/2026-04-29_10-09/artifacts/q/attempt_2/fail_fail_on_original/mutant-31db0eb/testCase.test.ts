import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should use setImmediate when window is defined', () => {
    const originalWindow = global.window;
    global.window = {};

    const nextTick = Q.nextTick;
    nextTick();

    expect(nextTick.requestTick.toString()).toContain('setImmediate');

    global.window = originalWindow;
  });
});