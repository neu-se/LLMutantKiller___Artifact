import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should dispatch "keys" operation correctly', () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj);
    const result = promise.keys();
    expect(result.dispatch).toBeDefined();
    expect(result.dispatch("keys", [])).toBeInstanceOf(Q);
  });
});