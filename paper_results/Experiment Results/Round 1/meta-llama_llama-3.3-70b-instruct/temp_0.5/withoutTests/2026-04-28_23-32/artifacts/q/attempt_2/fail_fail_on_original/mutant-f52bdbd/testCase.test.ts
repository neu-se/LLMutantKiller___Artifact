import { Q } from "../../../../../q";

describe('Q', () => {
  it('should track unhandled rejections with correct stack information', () => {
    const promise = Q.reject(new Error('Test error'));
    Q.nextTick(() => {
      const unhandledReasons = Q.getUnhandledReasons();
      expect(unhandledReasons.length).toBe(1);
      expect(typeof unhandledReasons[0]).toBe('string');
    });
  });
});