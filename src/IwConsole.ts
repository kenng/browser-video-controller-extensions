export default class IwConsole {
    static enabled = true;

    static log = function (arg?: any, ...args: any[]) {
        if (IwConsole.enabled) console.log(arg, ...args);
    };
}
