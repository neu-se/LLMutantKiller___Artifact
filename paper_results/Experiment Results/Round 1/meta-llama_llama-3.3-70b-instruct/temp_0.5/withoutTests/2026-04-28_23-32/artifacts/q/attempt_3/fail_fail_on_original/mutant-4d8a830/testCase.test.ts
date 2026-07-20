import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should handle post method with null or undefined name', () => {
    const obj = {
      foo: function() {
        return "foo called";
      }
    };

    const promise = Q(obj);
    promise.post("foo", []).then((result) => {
      expect(result).toBe("foo called");
    });
  });
});