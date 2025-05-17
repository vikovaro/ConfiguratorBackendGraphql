export enum EStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Canceled = 'Canceled',
    Completed = 'Completed',
}

export type TStatus = keyof typeof EStatus;
