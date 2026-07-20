describe("Q", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set in the environment", () => {
    const originalValue = Q.longStackSupport;
    Q.longStackSupport = false;
    process.env.Q_DEBUG = 'true';
    expect(Q.longStackSupport).toBe(true);
    Q.longStackSupport = originalValue;
    delete process.env.Q_DEBUG;
  });
});