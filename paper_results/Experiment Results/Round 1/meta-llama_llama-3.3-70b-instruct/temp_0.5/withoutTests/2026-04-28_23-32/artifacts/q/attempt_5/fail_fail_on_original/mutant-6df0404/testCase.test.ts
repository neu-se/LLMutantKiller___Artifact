describe("Q", () => {
  it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
    const originalGetUnhandledReasons = Q.getUnhandledReasons;
    Q.stopUnhandledRejectionTracking();
    const promise = Q.reject(new Error());
    Q.nextTick(() => {
      Q.stopUnhandledRejectionTracking();
      const promise2 = Q.reject(new Error());
      Q.nextTick(() => {
        expect(Q.getUnhandledReasons()).toEqual([]);
      });
    });
    Q.getUnhandledReasons = originalGetUnhandledReasons;
  });
});