import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call progress callback when no progress is made and an error is thrown', (done) => {
        let progressCalled = false;
        Q(true).then(
            () => {
                throw new Error();
            },
            () => {},
            () => {
                progressCalled = true;
            }
        ).catch(
            () => {
                expect(progressCalled).toBe(false);
                done();
            }
        );
    });
});