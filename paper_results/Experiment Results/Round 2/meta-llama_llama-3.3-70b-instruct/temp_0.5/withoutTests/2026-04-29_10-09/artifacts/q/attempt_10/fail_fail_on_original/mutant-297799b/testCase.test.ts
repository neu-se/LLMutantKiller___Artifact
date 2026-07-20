import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly handle promises', () => {
    const promise = Q.resolve('test');
    expect(promise.then((value) => value)).resolves.toBe('test');
  });
});