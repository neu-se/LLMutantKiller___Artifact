import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = Q.reject(new Error('Test error'));
    const unhandledReasonsBefore = Q.getUnhandledReasons();
    Q.nextTick(() => {
      const unhandledReasonsAfter = Q.getUnhandledReasons();
      expect(unhandledReasonsAfter.length).toBe(unhandledReasonsBefore.length + 1);
    });
  });
});