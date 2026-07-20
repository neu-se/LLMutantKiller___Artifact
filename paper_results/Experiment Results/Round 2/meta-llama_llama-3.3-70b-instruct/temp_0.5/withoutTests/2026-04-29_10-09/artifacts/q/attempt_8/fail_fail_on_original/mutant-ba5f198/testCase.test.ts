import { Q } from "./q";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    const originalSetImmediate = global.setImmediate;
    const setImmediateSpy = jest.fn();
    global.setImmediate = setImmediateSpy;
    Q.delay(Promise.resolve(), 10);
    expect(setImmediateSpy).toHaveBeenCalledTimes(1);
    global.setImmediate = originalSetImmediate;
  });
});