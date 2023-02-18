import { DLogger } from '@dlabs71/d-logger';
import FileAppender from './appender/file-appender.js';

/**
 * Base logger class
 * @extends DLogger
 */
export class DLoggerNode extends DLogger {
    /**
     * @param {object} config - {@see defaultConfig}
     */
    constructor(config = {}) {
        super(config);
    }

    /**
     * Adding file appender {@see FileAppender}
     * @param pathToDir - log directory
     * @param isRotatingFiles - use rotating log files. Delete old files {@see FileAppender#rotateLogFiles}
     * @param filePrefix - file prefix for log files.
     * @param level - log level threshold {@see LOG_LEVEL}
     * @param template - template for log row
     * @param stepInStack - number row in stack trace {@see getLocation}
     */
    addFileAppender(
        pathToDir,
        isRotatingFiles = false,
        filePrefix = null,
        level = null,
        template = null,
        stepInStack = null,
    ) {
        this.config.appenders.push(
            new FileAppender({
                level: level || this.config.level,
                directory: pathToDir,
                filePrefix: filePrefix || process.env.VUE_APP_LOG_FILE_PREFIX || 'app',
                template: template || this.config.template,
                isRotatingFiles,
                stepInStack: stepInStack || this.config.stepInStack,
            }),
        );
    }

    /**
     * Getting all file appenders
     * @returns list only with file appenders. {@see FileAppender}
     */
    getFileAppenders() {
        return this.config.appenders.filter((item) => item instanceof FileAppender);
    }

    /**
     * Checking for the existence of a in list appenders DLogger
     * @returns {boolean}
     */
    existFileAppender() {
        return this.getFileAppenders().length > 0;
    }

    /**
     * Deleting all log files that were created using file appenders
     * @returns {Promise}
     */
    deleteAllFileLogs() {
        const fileAppenders = this.getFileAppenders();
        const promises = [];
        if (fileAppenders.length > 0) {
            fileAppenders.forEach((appender) => {
                promises.push(appender.formatStoredLogs());
            });
        }
        if (promises.length === 0) {
            return new Promise((resolve) => resolve());
        }
        return Promise.all(promises);
    }
}

const $log = new DLoggerNode();

export default $log;
