import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q long stack support', () => {
    it('should include all calling functions in the stack trace when long stack support is enabled', async () => {
        Q.longStackSupport = true;

        function func1() {
            return Q().then(function () { return func2(); });
        }
        function func2() {
            return new Q.Promise(function (resolve, reject) {
                func3().then(resolve, reject);
            });
        }
        function func3() {
            return new Q.Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error('Test error'));
                }, 0);
            });
        }

        try {
            await func1();
        } catch (error) {
            expect(error.stack).toMatch(/func3.*func2.*func1/);
        }
    });

    it('should not include all calling functions in the stack trace when long stack support is disabled', async () => {
        Q.longStackSupport = false;

        function func1() {
            return Q().then(function () { return func2(); });
        }
        function func2() {
            return new Q.Promise(function (resolve, reject) {
                func3().then(resolve, reject);
            });
        }
        function func3() {
            return new Q.Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error('Test error'));
                }, 0);
            });
        }

        try {
            await func1();
        } catch (error) {
            expect(error.stack).not.toMatch(/func3.*func2.*func1/);
        }
    });
});