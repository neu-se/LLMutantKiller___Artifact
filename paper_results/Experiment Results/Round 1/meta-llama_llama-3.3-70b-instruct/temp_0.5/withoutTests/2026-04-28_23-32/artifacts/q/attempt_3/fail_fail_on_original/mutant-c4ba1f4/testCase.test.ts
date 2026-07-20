import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call nextTick correctly when setImmediate is available', (done) => {
    const callbackSpy = jest.fn();
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === 'function') {
      global.setImmediate = jest.fn((callback) => {
        callback();
      });

      Q.nextTick(callbackSpy);

      expect(global.setImmediate).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    } else {
      expect(callbackSpy).toHaveBeenCalledTimes(0);
      // We need to wait for the next tick of the event loop
      // to check if the callback was called
      global.setTimeout(() => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    }

    global.setImmediate = originalSetImmediate;
  });

  it('should not call nextTick correctly when setImmediate is available in mutated code', (done) => {
    const callbackSpy = jest.fn();
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === 'function') {
      global.setImmediate = jest.fn((callback) => {
        callback();
      });

      // Simulate the mutated code
      Q.nextTick(callbackSpy);

      // In the mutated code, setImmediate is not called
      expect(global.setImmediate).toHaveBeenCalledTimes(0);
      expect(callbackSpy).toHaveBeenCalledTimes(0);

      // We need to wait for the next tick of the event loop
      // to check if the callback was called
      global.setTimeout(() => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    } else {
      expect(callbackSpy).toHaveBeenCalledTimes(0);
      // We need to wait for the next tick of the event loop
      // to check if the callback was called
      global.setTimeout(() => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    }

    global.setImmediate = originalSetImmediate;
  });
});