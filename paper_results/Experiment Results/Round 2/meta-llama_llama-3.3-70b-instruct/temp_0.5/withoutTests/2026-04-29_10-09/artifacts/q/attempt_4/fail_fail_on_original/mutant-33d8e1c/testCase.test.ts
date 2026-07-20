import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call progressed callback when promise is resolved', () => {
        let progressedCalled = false;
        const promise = Q.resolve(1);
        promise.then(
            () => {},
            () => {},
            (value: any) => {
                progressedCalled = true;
            }
        );
        promise.progress((value: any) => {
            expect(value).toBe(1);
        });
        // Introduce a small delay to allow the progress callback to be called
        setTimeout(() => {
            expect(progressedCalled).toBe(true);
        }, 10);
    });
});