import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progressed callback when promise is resolved', () => {
        let progressedCalled = false;
        const promise = Q.resolve(1);
        promise.then(
            () => {},
            () => {},
            (value) => {
                progressedCalled = true;
            }
        );
        promise.progress(() => {});
        expect(progressedCalled).toBe(true);
    });
});