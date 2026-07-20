import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_map mutation test", () => {
  it("should correctly map values using array_map", () => {
    const input = [1, 2, 3];
    const callback = (value: number) => value * 2;
    const result = Q(input).map(callback);
    return result.then((mapped: number[]) => {
      expect(mapped).toEqual([2, 4, 6]);
    });
  });
});