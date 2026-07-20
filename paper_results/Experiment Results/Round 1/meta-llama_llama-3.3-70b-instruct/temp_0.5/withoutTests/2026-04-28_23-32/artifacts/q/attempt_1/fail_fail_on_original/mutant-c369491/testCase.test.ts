import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the "when" method with the correct arguments', () => {
        const promise = Q.resolve();
        const spy = jest.fn();
        promise.then(spy, undefined, undefined);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});