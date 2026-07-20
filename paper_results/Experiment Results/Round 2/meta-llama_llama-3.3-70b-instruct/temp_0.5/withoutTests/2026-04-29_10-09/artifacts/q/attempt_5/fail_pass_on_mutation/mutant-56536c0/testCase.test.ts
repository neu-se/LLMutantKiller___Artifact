import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', () => {
        jest.useFakeTimers();
        const promise = q.defer();
        let resolved = false;
        q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        jest.runAllTimers();
        expect(resolved).toBe(true);
    });
});