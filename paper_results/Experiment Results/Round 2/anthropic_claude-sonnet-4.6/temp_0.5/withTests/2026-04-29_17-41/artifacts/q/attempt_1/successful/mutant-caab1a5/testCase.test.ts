import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.when", () => {
  it("should call the fulfilled callback with the resolved value", async () => {
    const result = await new Promise<number>((resolve, reject) => {
      const promise = Q.when(42, (value: number) => {
        resolve(value);
        return value;
      }, (err: unknown) => {
        reject(err);
      });
    });
    expect(result).toBe(42);
  });
});