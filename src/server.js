import express from 'express';
import cors from "cors";

export const server = (apiList = []) => {
    const exp = express();

    if (global.lmConfig.server.useCors) {
        exp.use(cors());
    }

    // set up gzip compression
    if (global.lmConfig.server.gzip) {
        exp.use(compression({
            filter: (req, res) => req.headers['x-no-compression'] ? false : compression.filter(req, res)
        }));
    }

    exp.use(bodyParser.json());
    exp.use(bodyParser.urlencoded({
        extended: true
    }));

    
}