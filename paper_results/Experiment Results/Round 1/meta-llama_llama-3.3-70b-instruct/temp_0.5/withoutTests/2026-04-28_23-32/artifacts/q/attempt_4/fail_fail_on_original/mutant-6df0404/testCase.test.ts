describe("Q", () => {
  it("should stop unhandled rejection tracking when Q.stopUnhandledRejectionTracking is called", () => {
    const originalTrackUnhandledRejections = trackUnhandledRejections;
    Q.stopUnhandledRejectionTracking();
    expect(trackUnhandledRejections).toBe(false);
    trackUnhandledRejections = originalTrackUnhandledRejections;
  });
});