export default () => {    
    const os = require('os');

    const networkInterfaces = os.networkInterfaces();

    return Object.keys(networkInterfaces).map(key => {
        return networkInterfaces[key]
            .filter(addr => addr.family === 'IPv4')
            .reduce((arr, obj) => {
                arr.push(obj.address)
                return arr;
            }, [])
    }).reduce((newArr, arr) => {
        arr.forEach(ip =>
            newArr.push(ip)
        )
        return newArr;
    }, []);
}