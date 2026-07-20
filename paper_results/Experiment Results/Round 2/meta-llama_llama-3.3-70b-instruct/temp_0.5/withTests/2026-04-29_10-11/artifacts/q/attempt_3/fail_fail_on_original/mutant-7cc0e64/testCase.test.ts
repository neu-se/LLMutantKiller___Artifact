import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is truthy', () => {
        const originalProcess = global.process;
        global.process = { domain: { bind: jest.fn() } } as any;

        const error = new Error();
        const onUnhandledError = jest.fn();
        Q.onerror = jest.fn();
        Q.done(Q.reject(error), null, null, null);
        expect(Q.onerror).toHaveBeenCalledTimes(1);

        global.process = originalProcess;
    });
});