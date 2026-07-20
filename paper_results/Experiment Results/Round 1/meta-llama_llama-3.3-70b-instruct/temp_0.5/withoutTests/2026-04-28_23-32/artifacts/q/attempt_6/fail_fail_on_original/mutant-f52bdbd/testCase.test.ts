import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = q.reject(new Error('Test error'));
    const unhandledReasonsBefore = q.getUnhandledReasons();
    q.nextTick(() => {
      const unhandledReasonsAfter = q.getUnhandledReasons();
      expect(unhandledReasonsAfter.length).toBeGreaterThan(unhandledReasonsBefore.length);
      expect(unhandledReasonsAfter[unhandledReasonsAfter.length - 1]).toContain('Test error');
    });
  });
});