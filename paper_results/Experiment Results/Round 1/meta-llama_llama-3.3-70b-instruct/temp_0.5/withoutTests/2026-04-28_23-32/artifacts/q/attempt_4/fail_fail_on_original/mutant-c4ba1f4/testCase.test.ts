import { Q } from "../../../../../q.js";

describe('Q', () => {
  it('should call nextTick correctly', (done) => {
    const callbackSpy = jest.fn();
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === 'function') {
      global.setImmediate = jest.fn((callback) => {
        callback();
      });
    }

    Q.nextTick(callbackSpy);

    if (typeof setImmediate === 'function') {
      expect(global.setImmediate).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    } else {
      expect(callbackSpy).toHaveBeenCalledTimes(0);
      global.setTimeout(() => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    }

    global.setImmediate = originalSetImmediate;
  });
});