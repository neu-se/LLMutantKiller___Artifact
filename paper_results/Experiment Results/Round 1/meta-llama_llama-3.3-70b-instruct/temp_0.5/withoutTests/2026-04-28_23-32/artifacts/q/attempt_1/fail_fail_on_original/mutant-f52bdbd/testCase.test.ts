import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = Q.reject(new Error('Test error'));
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(1);
    expect(unhandledReasons[0]).toContain('Error: Test error');
  });
});