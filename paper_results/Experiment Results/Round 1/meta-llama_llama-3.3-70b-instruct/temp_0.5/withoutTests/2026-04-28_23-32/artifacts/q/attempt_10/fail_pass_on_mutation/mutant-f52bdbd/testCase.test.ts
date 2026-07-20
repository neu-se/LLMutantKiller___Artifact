import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const error = new Error('Test error');
    const promise = q.reject(error);
    const unhandledReasonsBefore = q.getUnhandledReasons();
    q.nextTick(() => {
      const unhandledReasonsAfter = q.getUnhandledReasons();
      const lastUnhandledReason = unhandledReasonsAfter[unhandledReasonsAfter.length - 1];
      expect(lastUnhandledReason).toContain(error.message);
      expect(lastUnhandledReason).toContain('Error: Test error');
    });
  });
});