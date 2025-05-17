import { Global, Module } from '@nestjs/common';
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';
import { ORDERS_METRIC, USERS_METRIC } from './metrics-name';

const newUserMetricProvider = makeCounterProvider({
    name: USERS_METRIC,
    help: 'Metric for new users',
    labelNames: ['users'],
});

const newOrderMetricProvider = makeCounterProvider({
    name: ORDERS_METRIC,
    help: 'Metric for new orders',
    labelNames: ['orders'],
});

@Global()
@Module({
    imports: [
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: {
                enabled: true,
            },
        }),
    ],
    providers: [MetricsService, newUserMetricProvider, newOrderMetricProvider],
    exports: [MetricsService, newUserMetricProvider, newOrderMetricProvider],
})
export class MetricsModule {}
