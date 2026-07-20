import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call progress callback only when progress is made', () => {
        let progressCalled = false;
        Q(true).then(
            () => {},
            () => {},
            () => {
                progressCalled = true;
            }
        );
        expect(progressCalled).toBe(false);
    });
});