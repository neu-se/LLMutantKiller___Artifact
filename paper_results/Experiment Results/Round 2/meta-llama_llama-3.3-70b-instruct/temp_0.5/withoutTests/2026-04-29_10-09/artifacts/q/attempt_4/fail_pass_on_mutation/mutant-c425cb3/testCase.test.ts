import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call progress callback only when progress is made', (done) => {
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