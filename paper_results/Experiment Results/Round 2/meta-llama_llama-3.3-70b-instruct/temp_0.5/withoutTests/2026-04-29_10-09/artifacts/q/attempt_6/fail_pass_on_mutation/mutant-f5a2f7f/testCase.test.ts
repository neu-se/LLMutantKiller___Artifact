import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const error = new Error();
    expect(error.stack).toBeDefined();
    const qPromise = q((resolve, reject) => {
      try {
        throw error;
      } catch (e) {
        resolve(e);
      }
    });
    qPromise.then((error) => {
      expect(error.stack).toBeDefined();
    });
  });
});