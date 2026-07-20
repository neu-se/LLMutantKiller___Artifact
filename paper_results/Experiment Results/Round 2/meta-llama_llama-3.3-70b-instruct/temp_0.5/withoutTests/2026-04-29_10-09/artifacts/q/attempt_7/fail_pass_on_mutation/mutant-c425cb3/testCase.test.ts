import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call progress callback only when progress is made', (done) => {
        let progressCalled = false;
        Q(true).then(
            () => {},
            () => {},
            (progress) => {
                progressCalled = true;
            }
        ).then(
            () => {
                throw new Error();
            }
        ).catch(
            () => {
                expect(progressCalled).toBe(false);
                done();
            }
        );
    });
});