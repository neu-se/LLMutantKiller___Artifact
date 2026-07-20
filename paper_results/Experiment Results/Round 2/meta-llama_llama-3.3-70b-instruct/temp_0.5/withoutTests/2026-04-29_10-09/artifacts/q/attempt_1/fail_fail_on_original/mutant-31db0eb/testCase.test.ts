import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should not use setImmediate when window is not defined', () => {
    const originalWindow = global.window;
    delete global.window;

    const nextTick = Q.nextTick;
    const requestTick = nextTick.requestTick;

    expect(requestTick).not.toContain('setImmediate');

    global.window = originalWindow;
  });
});