import { Q } from "./q";

describe("Q promise post method", () => {
  it("should handle null or undefined method names correctly", () => {
    const obj = {
      method: function() {
        return "called";
      }
    };

    const promise = Q(obj);
    const resultPromise = promise.post(null, []);

    return resultPromise.then(result => {
      expect(result).toBeUndefined();
    });
  });
});