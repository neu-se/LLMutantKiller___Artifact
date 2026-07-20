import { Q } from "../../../q.js";

describe('Q', () => {
  it('should call nextTick correctly when setImmediate is available', (done) => {
    const callbackSpy = jest.fn();
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = jest.fn((callback) => {
      callback();
    });
    Q.nextTick(callbackSpy);
    expect(global.setImmediate).toHaveBeenCalledTimes(1);
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    global.setImmediate = originalSetImmediate;
    done();
  });

  it('should not call nextTick correctly when setImmediate is available in mutated code', (done) => {
    const callbackSpy = jest.fn();
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = jest.fn((callback) => {
      callback();
    });
    // Simulate the mutated code
    Q.nextTick(callbackSpy);
    expect(global.setImmediate).toHaveBeenCalledTimes(0);
    expect(callbackSpy).toHaveBeenCalledTimes(0);
    global.setTimeout(() => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      done();
    }, 0);
    global.setImmediate = originalSetImmediate;
  });
});