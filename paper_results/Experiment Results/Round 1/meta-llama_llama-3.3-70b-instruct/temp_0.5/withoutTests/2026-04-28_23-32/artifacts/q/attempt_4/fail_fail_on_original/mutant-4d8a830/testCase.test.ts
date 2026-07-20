import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should handle post method with null or undefined name', async () => {
    const obj = {
      foo: function() {
        return "foo called";
      }
    };

    const promise = Q(obj);
    const result = await promise.post("foo", []);
    expect(result).toBe("foo called");
  });
});