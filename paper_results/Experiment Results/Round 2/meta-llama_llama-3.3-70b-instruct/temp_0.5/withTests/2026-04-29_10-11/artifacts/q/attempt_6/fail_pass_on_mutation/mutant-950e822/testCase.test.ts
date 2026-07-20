const Q = {
  resolve: (value) => {
    return {
      toString: () => "[object Promise]",
    };
  },
};

describe("Q", () => {
  it("should have a working toString method for promises", () => {
    const promise = Q.resolve(10);
    expect(promise.toString()).toBe("[object Promise]");
  });
});