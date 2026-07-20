describe('Q', () => {
  it('should correctly handle the hasStacks variable', () => {
    const q = Q(function (resolve, reject) {
      try {
        throw new Error();
      } catch (e) {
        resolve(e);
      }
    });
    q.then((error) => {
      expect(error.stack).toBeDefined();
    });
  });
});