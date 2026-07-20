import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call progress callback only when progress is made', () => {
        let progressCalled = false;
        let threw = false;
        Q.resolve().then(
            () => {},
            () => {},
            () => {
                progressCalled = true;
            }
        ).then(
            () => {
                try {
                    throw new Error();
                } catch (e) {
                    threw = true;
                }
            },
            () => {}
        );
        expect(progressCalled).toBe(false);
        expect(threw).toBe(true);
    });
});