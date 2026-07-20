import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const error = new Error();
        const originalGetFileNameAndLineNumber = getFileNameAndLineNumber;
        const spy = jest.fn();
        getFileNameAndLineNumber = spy;
        Q.reject(error);
        expect(spy).toHaveBeenCalledTimes(1);
        getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});