const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.promised mutation test", () => {
  it("should correctly pass 'this' context and arguments to the callback", async () => {
    const context = { value: 42 };
    const arg1 = 10;
    const arg2 = 20;

    const testFunc = Q.promised(function(this: any, a: number, b: number) {
      return this.value + a + b;
    });

    const result = await testFunc.call(context, arg1, arg2);
    expect(result).toBe(72); // 42 + 10 + 20
  });
});