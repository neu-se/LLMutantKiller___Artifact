import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should dispatch "keys" operation correctly', () => {
    const obj = {};
    const promise = Q(obj);
    const result = promise.keys();
    result.then((value) => {
      expect(value).toEqual(Object.keys(obj));
    });
  });
});