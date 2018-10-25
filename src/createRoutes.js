import express from 'express';

const createRoutes = (apiList) => {
    const router = express.Router()
    const flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
    const routeList = flatten(apiList.map(api =>
        Object.keys(api).map(func => ({
            type: func.substr(0, func.indexOf('_')),
            name: func.substr(func.indexOf('_') + 1),
            callback: api[func]
        }))
    ));

    routeList.forEach(route => {
        console.log(`${route.type} -> `, route.name)
        router[route.type]('/' + route.name, (req, res) => {
            route.callback(req, res)
        })
    })

    return router;
}

export default createRoutes;