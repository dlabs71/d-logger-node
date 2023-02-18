import {
    ConsoleAppender,
    createTemplate,
    LOG_LEVEL,
    LogAppender,
    LogMessageInfo,
    templateFns,
} from '@dlabs71/d-logger';
import $log, { DLoggerNode } from './d-logger-node.js';
import FileAppender from './appender/file-appender.js';
import DLoggerNodePlugin from './d-logger-node-plugin.js';

export {
    DLoggerNodePlugin,
    DLoggerNodePlugin as DLoggerPlugin,
    templateFns,
    createTemplate,
    LogMessageInfo,
    ConsoleAppender,
    FileAppender,
    LogAppender,
    DLoggerNode,
    DLoggerNode as DLogger,
    $log,
    LOG_LEVEL,
};
