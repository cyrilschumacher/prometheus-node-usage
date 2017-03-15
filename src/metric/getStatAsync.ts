import * as pidusage from "pidusage";

type StatResolve = (stat: pidusage.Stat) => void;
type StatReject = (error: any) => void;

export async function getStatAsync(pid: number) {
    const executor = (resolve: StatResolve, reject: StatReject) => {
        const callback = (error: any, stat: pidusage.Stat) => {
            if (error) {
                return reject(error);
            }

            resolve(stat);
        };

        pidusage.stat(pid, callback);
    };

    return new Promise(executor);
}
