import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should throw an error when exception property is accessed on a fulfilled promise in the mutated code', () => {
        const promise = Q.resolve('Test Value');
        const inspected = promise.inspect();
        if (inspected.state === 'fulfilled') {
            expect(() => inspected.exception).toThrowError();
        }
    });
});