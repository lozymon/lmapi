import express from 'express';
import cors from "cors";
import http from 'http';
import compression from 'compression';
import bodyParser from "body-parser";
import ipAddress from './ipAddress';
import createRoutes from "./createRoutes";

export const server = (apiList = []) => {
    const exp = express();

    if (lmConfig.server.useCors) {
        exp.use(cors());
    }

    // set up gzip compression
    if (lmConfig.server.gzip) {
        exp.use(compression({
            filter: (req, res) => req.headers['x-no-compression'] ? false : compression.filter(req, res)
        }));
    }

    exp.use(bodyParser.json());
    exp.use(bodyParser.urlencoded({
        extended: true
    }));

    exp.use('/api', createRoutes(apiList))

    exp.use("/", (req, res) => res.status(422).json({
        message: req.protocol + "://" + req.get('host') + req.originalUrl + " do not exist !"
    }));

    const server = http.createServer(exp);

    server.listen(lmConfig.server.port, () => {

        console.log('\n\nServer listening on port ' + lmConfig.server.port + "\n\n");
        ipAddress().forEach(ip => {
            console.log("http://" + ip + ":" + lmConfig.server.port + "/api/" + lmConfig.server.module );
        })

    });
}