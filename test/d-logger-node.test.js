import {DLoggerNode} from "../src/index.js";
import {createLogDir, getListDir} from "./helpers/fs-helper.js";

const LOG_DIR = "test/log-d-logger-node-test";

describe("testing d-logger-node", () => {

    beforeEach(() => {
        createLogDir(LOG_DIR);
    });

    it("test addFileAppender", () => {
        let logger = new DLoggerNode();
        logger.clearAppenders();
        logger.addFileAppender(LOG_DIR, true);
        expect(logger.config.appenders.length).toBe(1);
    });

    it("test existFileAppender and getFileAppenders", () => {
        let logger = new DLoggerNode();
        logger.addFileAppender(LOG_DIR, true);
        expect(logger.existFileAppender()).toBeTruthy();
        logger.addFileAppender(LOG_DIR, true, "app2");
        expect(logger.getFileAppenders().length).toBe(2);
        logger.clearAppenders();
        expect(logger.existFileAppender()).toBeFalsy();
    });

    it("test deleteAllFileLogs", () => {
        let logger = new DLoggerNode();
        logger.addFileAppender(LOG_DIR, true);
        logger.addFileAppender(LOG_DIR, true, "app2");
        expect(logger.getFileAppenders().length).toBe(2);
        logger.deleteAllFileLogs();
        expect(getListDir(LOG_DIR).length).toBeFalsy();
    });
});