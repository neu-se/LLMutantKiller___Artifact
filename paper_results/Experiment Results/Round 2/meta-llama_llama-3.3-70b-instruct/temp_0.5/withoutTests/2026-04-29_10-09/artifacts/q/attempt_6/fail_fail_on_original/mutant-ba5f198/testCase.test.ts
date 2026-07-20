import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    const promise = Q.delay(Promise.resolve(), 10);
    expect(promise).resolves.toEqual(Promise.resolve());
  });
});