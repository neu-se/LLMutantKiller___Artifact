import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = q.reject(new Error('Test error'));
    const unhandledReasonsBefore = q.getUnhandledReasons();
    q.nextTick(() => {
      const unhandledReasonsAfter = q.getUnhandledReasons();
      expect(unhandledReasonsAfter.length).toBe(unhandledReasonsBefore.length + 1);
      expect(unhandledReasonsAfter[0]).toContain('Test error');
    });
  });
});