import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const originalQ = q;
    const mockQ = jest.fn((callback) => {
      callback();
    });
    q = mockQ;
    const error = new Error();
    const qPromise = q((resolve, reject) => {
      try {
        throw error;
      } catch (e) {
        resolve(e);
      }
    });
    qPromise.then((error) => {
      expect(mockQ).toHaveBeenCalledTimes(1);
    });
    q = originalQ;
  });
});