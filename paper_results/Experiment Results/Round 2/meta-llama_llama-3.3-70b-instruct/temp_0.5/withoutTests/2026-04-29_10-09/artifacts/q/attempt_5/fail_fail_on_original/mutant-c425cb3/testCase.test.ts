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
            (error) => {
                expect(progressCalled).toBe(false);
                done();
            }
        );
        // Intentionally throw an error to test if the progress callback is called
        throw new Error();
    });
});