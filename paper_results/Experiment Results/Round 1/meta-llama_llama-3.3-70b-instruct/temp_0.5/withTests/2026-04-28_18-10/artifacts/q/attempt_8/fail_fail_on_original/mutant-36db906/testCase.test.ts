import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.denodeify', () => {
    it('should return a function when given a valid callback', () => {
        const callback = (err: any, value: any) => {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe('function');
    });

    it('should call the callback with an error when the denodeified function is called with an error', () => {
        const callback = jest.fn((err: any, value: any) => {});
        const denodeified = Q.denodeify(callback);
        denodeified(new Error('Test error'), null);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(new Error('Test error'), null);
    });
});