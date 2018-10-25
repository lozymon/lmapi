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
            const ret = route.callback(req, res)

            // if callback has return value trye to find the type and return the value
            if (typeof ret === 'string') {
                res.send(ret);
            } else if (typeof ret === 'object') {
                res.send(JSON.stringify(ret));
            }
        })
    })

    return router;
}

export default createRoutes;