import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should dispatch "keys" operation correctly', () => {
    const promise = Q({});
    const result = promise.keys();
    expect(result).toBeInstanceOf(Q);
    expect(result.dispatch).toBeInstanceOf(Function);
  });
});