declare module "procfs-stats" {
    namespace procfs {
        export interface Disk {
            cancelled_write_bytes: string;
            rchar: string;
            read_bytes: string;
            syscr: string;
            syscw: string;
            wchar: string;
            write_bytes: string;
        }

        export class Stat {
            io(callback: (error: any, io: Disk) => void): never;
        }
    }

    function procfs(pid: number): procfs.Stat;
    export = procfs;
}