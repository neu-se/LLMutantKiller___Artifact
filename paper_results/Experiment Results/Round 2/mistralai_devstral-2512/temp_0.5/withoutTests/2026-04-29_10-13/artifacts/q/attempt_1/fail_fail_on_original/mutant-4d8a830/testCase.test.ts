import { Q } from "./q";

describe("Q promise post method", () => {
  it("should handle null method name correctly", () => {
    const obj = {
      method: function() {
        return "called";
      }
    };

    const promise = Q(obj);
    return promise.post(null, []).then(
      (result) => {
        expect(result).toBe("called");
      },
      (error) => {
        throw new Error("Should not reject when method name is null");
      }
    );
  });
});