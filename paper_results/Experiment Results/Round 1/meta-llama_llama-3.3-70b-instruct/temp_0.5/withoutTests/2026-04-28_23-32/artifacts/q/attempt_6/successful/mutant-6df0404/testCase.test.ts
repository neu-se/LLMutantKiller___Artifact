import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should stop unhandled rejection tracking when q.stopUnhandledRejectionTracking is called", () => {
    q.stopUnhandledRejectionTracking();
    const promise = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise2 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise3 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise4 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise5 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise6 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise7 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise8 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise9 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise10 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise11 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise12 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise13 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    q.stopUnhandledRejectionTracking();
    const promise14 = q.reject(new Error());
    q.nextTick(() => {
      expect(q.getUnhandledReasons()).toEqual([]);
    });
    expect(q.getUnhandledReasons()).toEqual([]);
  });
});