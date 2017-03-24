declare module "pidusage" {
    interface Stat {
        cpu: number;
        mem: number;
    }

    type StatCallback = (error: any, stat: Stat) => void;

    export function stat(pid: number, callback: StatCallback): never;
    export function unmonitor(pid: number): never;
}