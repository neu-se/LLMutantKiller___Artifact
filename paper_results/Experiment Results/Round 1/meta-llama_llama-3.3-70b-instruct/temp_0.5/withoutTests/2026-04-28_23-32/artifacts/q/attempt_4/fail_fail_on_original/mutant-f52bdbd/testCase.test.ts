import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = q.Q.reject(new Error('Test error'));
    const unhandledReasonsBefore = q.Q.getUnhandledReasons();
    q.Q.nextTick(() => {
      const unhandledReasonsAfter = q.Q.getUnhandledReasons();
      expect(unhandledReasonsAfter.length).toBe(unhandledReasonsBefore.length + 1);
    });
  });
});