import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call setImmediate when available', (done) => {
    const originalSetImmediate = global.setImmediate;
    const flushSpy = jest.fn();
    global.setImmediate = jest.fn((callback) => {
      callback();
    });

    Q.nextTick(flushSpy);

    expect(global.setImmediate).toHaveBeenCalledTimes(1);
    expect(flushSpy).toHaveBeenCalledTimes(1);

    global.setImmediate = originalSetImmediate;
    done();
  });
});