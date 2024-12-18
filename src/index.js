import {ConsoleAppender, createTemplate, LOG_LEVEL, LogAppender, LogMessageInfo, templateFns,} from '@dlabs71/d-logger';
import dlog, {DLoggerNode} from './d-logger-node.js';
import FileAppender from './appender/file-appender.js';
import DLoggerNodePlugin from './d-logger-node-plugin.js';
import {useDLog} from './dlog-composable';

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
    dlog,
    LOG_LEVEL,
    useDLog
};
