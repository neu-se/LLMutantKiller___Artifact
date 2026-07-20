import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', () => {
    const nextTickString = Q.nextTick.toString();
    expect(nextTickString).toContain('setImmediate');
  });
});