import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call progress callback only when progress is made', (done) => {
        let progressCalled = false;
        let threw = false;
        Q(true).then(
            () => {},
            () => {
                threw = true;
            },
            () => {
                progressCalled = true;
            }
        ).then(
            () => {},
            () => {
                expect(progressCalled).toBe(false);
                expect(threw).toBe(true);
                done();
            }
        );
    });
});