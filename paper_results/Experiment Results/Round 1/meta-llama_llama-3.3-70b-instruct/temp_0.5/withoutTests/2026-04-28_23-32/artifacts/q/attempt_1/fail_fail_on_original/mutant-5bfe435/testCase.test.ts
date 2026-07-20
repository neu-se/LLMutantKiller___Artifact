import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle nextTick with process.nextTick', () => {
    const originalNextTick = Q.nextTick;
    const spy = jest.fn();
    Q.nextTick(spy);
    expect(spy).toHaveBeenCalledTimes(0);
    // Simulate a next tick
    originalNextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});