export interface IUserWorker {
  asignWorkerToUser(userId: number, worker: any);
  getWorkerByUserId(userId: number): any;
  removeWorkerForUser(userId: number);
}
