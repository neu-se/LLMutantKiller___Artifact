import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should handle post method with null or undefined name', () => {
    const promise = Q({
      post: function(name, args) {
        if (name === null || name === void 0) {
          return this.apply(void 0, args);
        } else {
          return this[name].apply(this, args);
        }
      }
    });
    expect(promise.post(null, [1, 2, 3])).toThrow();
    expect(promise.post(void 0, [1, 2, 3])).toThrow();
  });
});