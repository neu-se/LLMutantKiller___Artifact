import { Q } from "./q.js";

describe('Q', () => {
  it('should dispatch "keys" operation correctly', () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj);
    const result = promise.dispatch("keys", []);
    expect(result).toBeInstanceOf(Q);
    result.then((value) => {
      expect(value).toEqual(Object.keys(obj));
    });
  });
});