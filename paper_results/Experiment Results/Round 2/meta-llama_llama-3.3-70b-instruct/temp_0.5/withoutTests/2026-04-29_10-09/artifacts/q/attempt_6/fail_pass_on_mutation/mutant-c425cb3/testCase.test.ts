import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call progress callback when no progress is made', (done) => {
        let progressCalled = false;
        Q(true).then(
            () => {},
            () => {},
            () => {
                progressCalled = true;
            }
        ).then(
            () => {
                expect(progressCalled).toBe(false);
                done();
            },
            () => {
                expect(progressCalled).toBe(false);
                done();
            }
        );
    });
});