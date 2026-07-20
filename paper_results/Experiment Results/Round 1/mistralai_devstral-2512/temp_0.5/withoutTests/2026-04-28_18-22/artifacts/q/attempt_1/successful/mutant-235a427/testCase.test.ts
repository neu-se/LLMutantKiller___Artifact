import { promised } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promised function decorator", () => {
  it("should correctly pass 'this' context and arguments to the callback", async () => {
    const context = { value: 42 };
    const callback = jest.fn(function (this: any, a: number, b: number) {
      return this.value + a + b;
    });

    const decorated = promised(callback);
    const result = await decorated.call(context, 1, 2);

    expect(result).toBe(45);
    expect(callback).toHaveBeenCalledWith(1, 2);
  });
});