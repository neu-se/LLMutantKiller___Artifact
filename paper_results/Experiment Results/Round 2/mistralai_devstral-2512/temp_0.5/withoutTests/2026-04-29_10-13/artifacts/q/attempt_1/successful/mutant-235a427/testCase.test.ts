import { promised } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promised function decorator", () => {
  it("should correctly pass 'this' context and arguments to the callback", async () => {
    const context = { value: 42 };
    const callback = jest.fn(function (this: any, a: number, b: number) {
      return this.value + a + b;
    });

    const decorated = promised(callback);
    const result = await decorated.call(context, 10, 20);

    expect(result).toBe(72); // 42 (context) + 10 + 20
    expect(callback).toHaveBeenCalledWith(10, 20);
  });
});