import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should call the resolve function when a promise is resolved', () => {
        const resolveSpy = jest.fn();
        const rejectSpy = jest.fn();

        Q.race([Q.resolve('resolved')]).then(resolveSpy, rejectSpy);

        expect(resolveSpy).toHaveBeenCalledTimes(1);
        expect(rejectSpy).toHaveBeenCalledTimes(0);
    });
});