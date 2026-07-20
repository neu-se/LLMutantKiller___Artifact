import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should handle post method with null or undefined name', () => {
    const obj = {
      post: function(name, args) {
        if (name === null || name === void 0) {
          return this.apply(void 0, args);
        } else {
          return this[name].apply(this, args);
        }
      },
      apply: function(thisArg, argArray) {
        return "apply called";
      }
    };

    const promise = Q(obj);
    expect(promise.post(null, [1, 2, 3])).resolves.toEqual("apply called");
    expect(promise.post(void 0, [1, 2, 3])).resolves.toEqual("apply called");
  });
});