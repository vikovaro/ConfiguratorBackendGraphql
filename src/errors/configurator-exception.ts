export class ConfiguratorException extends Error {
    constructor(message) {
        super(message);
        this.name = 'configurator-exception';
    }
}
