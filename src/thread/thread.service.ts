import { Injectable } from '@nestjs/common';
import { IUserWorker } from './interfaces/thread.interface';

@Injectable()
export class UserWorkerService implements IUserWorker {
  private readonly usersMapping: Record<string, any> = {};

  asignWorkerToUser(userId: number, worker: any) {
    this.usersMapping[userId] = worker;
  }

  getWorkerByUserId(userId: number): any {
    return this.usersMapping[userId];
  }

  removeWorkerForUser(userId: number) {
    delete this.usersMapping[userId];
  }
}
