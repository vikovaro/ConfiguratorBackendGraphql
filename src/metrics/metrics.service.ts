import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { ORDERS_METRIC, USERS_METRIC } from './metrics-name';

@Injectable()
export class MetricsService {
    constructor(
        @InjectMetric(USERS_METRIC) public usersCounter: Counter<string>,
        @InjectMetric(ORDERS_METRIC) public ordersCounter: Counter<string>,
    ) {}

    async incUsersCount() {
        this.usersCounter.inc();
    }

    async incOrdersCount() {
        this.usersCounter.inc();
    }
}
