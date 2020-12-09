import path from 'path';
import _ from 'lodash';


export interface ServerConfigurationLoaderOptions {
    dirname?: string;
    basePath?: string;
    namespace?: string
}

export interface ConfigurationOptions {
}

export class ServerConfigurationLoader {

    constructor(public options?: Partial<ServerConfigurationLoaderOptions>) {
    }

    load(options?: Partial<ServerConfigurationLoaderOptions>): ConfigurationOptions {

        options = _.assign({}, this.options, options);

        const optionsDir: string = path.join(<string>options.dirname, <string>options.basePath);
        const optionsBaseFilePath: string = path.join(optionsDir, <string>options.namespace);
        const optionsEnvFilePath: string = path.join(optionsBaseFilePath + '.' + process.env.NODE_ENV);
        
        let optionsBase;
        try {
            optionsBase = require(optionsBaseFilePath);
        } catch (err) {
            optionsBase = {};
        }

        let optionsEnv;
        try {
            optionsEnv = require(optionsEnvFilePath);
        } catch (err) {
            optionsEnv = {};
        }

        const result = _.merge({}, optionsBase, optionsEnv);
        return result;
    }
}
