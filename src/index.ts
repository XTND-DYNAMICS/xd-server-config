import path from 'path';
import _ from 'lodash';


export interface ConfigurationLoaderOptions {
    dirname: string;
    basePath: string;
    namespace: string
}

export interface ConfigurationOptions {
}

export class ConfigurationLoader {

    constructor(public options: ConfigurationLoaderOptions) {
    }

    load(): Promise<ConfigurationOptions> {

        const optionsDir: string = path.join(this.options.dirname, '');

        const optionsBaseFilePath: string = path.join(optionsDir, this.options.namespace);
        const optionsBase = require(optionsBaseFilePath);
        const optionsEnvFilePath: string = path.join(optionsBaseFilePath + '.' + process.env.NODE_ENV);
        const optionsEnv = require(optionsEnvFilePath);
        const options = _.merge({}, optionsBase, optionsEnv);

        return Promise.resolve(options);
    }
}
